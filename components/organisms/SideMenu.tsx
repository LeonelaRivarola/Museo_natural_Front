import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface MenuItemProps {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  highlight?: boolean;
}

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

/* ---------------- MENU ITEM ---------------- */
const MenuItem: React.FC<MenuItemProps> = ({
  label,
  iconName,
  onPress,
  highlight,
}) => {
  const text = useThemeColor({}, "text");
  const tint = useThemeColor({}, "tint");
  const isBottomButton = label === "Cerrar sesión" || label === "Iniciar sesión";


  return (
    <>
      <TouchableOpacity
        style={[
          styles.item,
          highlight && { backgroundColor: tint },
          isBottomButton && {
            borderRadius: 12,
            marginHorizontal: -10,
            paddingVertical: 16,
            marginBottom: 5,
            borderWidth: 1,
            borderColor: tint,
            justifyContent: "center",
          },
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Ionicons
          name={iconName}
          size={24}
          color={highlight ? "#fff" : text}
          style={styles.icon}
        />
        <Text
          style={[
            styles.label,
            { color: text },
            highlight && { color: "#fff", fontWeight: "bold" },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>

      <View style={styles.separator} />
    </>
  );

};

/* ---------------- SIDE MENU ---------------- */

const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose }) => {
  const router = useRouter();

  const background = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const tint = useThemeColor({}, "tint");

  const currentPath = usePathname() || "";
  console.log("📌 CURRENT PATH:", currentPath);



  const [user, setUser] = useState<any>(null);

  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  /* ANIMACIÓN */
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: width,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  /* LOAD USER */
  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    };
    loadUser();
  }, [visible]);

  /* LOGOUT */
  const logout = async () => {
    await AsyncStorage.multiRemove(["token", "user", "rol"]); // Borra datos
    setUser(null); // Resetea estado local
    onClose(); // Cierra el menú
    router.push("/(tabs)/home"); // Redirige al Home en vez de login
  };


  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={StyleSheet.absoluteFillObject}>
        {/* OVERLAY */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[styles.overlay, { opacity: fadeAnim }]}
          />
        </TouchableWithoutFeedback>

        {/* MENU */}
        <Animated.View
          style={[
            styles.menu,
            {
              transform: [{ translateX: slideAnim }],
              backgroundColor: background,
              shadowColor: text,
            },
          ]}
        >
          {/* PERFIL / INVITADO */}
          <View style={styles.profileSection}>
            <Ionicons
              name={user ? "person-circle-outline" : "person-outline"}
              size={64}
              color={tint}
            />
            <Text style={[styles.userName, { color: text }]}>
              {user ? `${user.nombre} ${user.apellido}` : "Visitante"}
            </Text>
          </View>

          {/* TITULO */}
          <Text style={[styles.title, { color: tint }]}>Menú</Text>
          <View style={styles.menuTitleSeparator} />


          {/* ITEMS DEL MENU */}
          <View style={styles.menuItems}>
            <MenuItem
              label="Inicio"
              iconName="home-outline"
              highlight={currentPath.startsWith("/home")}
              onPress={() => {
                onClose();
                router.push("/(tabs)/home");
              }}
            />
            <MenuItem
              label="Galería"
              iconName="images-outline"
              highlight={currentPath.startsWith("//galeria")}
              onPress={() => {
                onClose();
                router.push("/(tabs)/galeria");
              }}
            />
            <MenuItem
              label="Tienda"
              iconName="storefront-outline"
              highlight={currentPath.startsWith("/tienda")}
              onPress={() => {
                onClose();
                router.push("/(tabs)/tienda");
              }}
            />
            <MenuItem
              label="Eventos"
              iconName="calendar-outline"
              highlight={currentPath.startsWith("/eventos")}

              onPress={() => console.log("Eventos")}
            />
            <MenuItem
              label="Ayuda"
              iconName="help-circle-outline"
              highlight={currentPath.startsWith("/ayuda")}
              onPress={() => {
                onClose();
                router.push("/ayuda");
              }}
            />
            <MenuItem
              label="¿Quiénes somos?"
              iconName="information-circle-outline"
              highlight={currentPath.startsWith("/quienes")}
              onPress={() => {
                onClose();
                router.push("/quienes");
              }}
            />
          </View>

          {/* BOTON FINAL */}
          <View style={styles.bottomButton}>
            <MenuItem
              label={user ? "Cerrar sesión" : "Iniciar sesión"}
              iconName={user ? "log-out-outline" : "log-in-outline"}
              highlight
              onPress={() => {
                if (user) logout();
                else {
                  onClose();
                  router.push("/login");
                }
              }}
            />
          </View>
        </Animated.View>

      </View>
    </Modal>
  );
};

export default SideMenu;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },

  menu: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.8,
    paddingTop: Platform.OS === "android" ? 50 : 60,
    paddingHorizontal: 20,
    shadowOpacity: 0.4,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 6,
    elevation: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    alignSelf: "flex-start",
    opacity: 0.8,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 0,
  },

  icon: {
    marginRight: 12,
  },

  label: {
    fontSize: 18,
  },

  separator: {
    height: 1,
    width: "60%",
    alignSelf: "flex-start",
    marginLeft: 8,
    backgroundColor: "rgba(150,150,150,0.20)", // muy suave
    marginVertical: 4,
  },

  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },

  userName: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "600",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },

  menuItems: {
    flex: 1,
    gap: 4,
  },

  bottomButton: {
    marginTop: 25,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#aaa", // separador más claro y moderno
  },
  menuTitleSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(32, 32, 32, 0.8)",
    marginBottom: 12,
    marginTop: 2,
  }

});
