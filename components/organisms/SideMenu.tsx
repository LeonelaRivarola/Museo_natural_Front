import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// =====================
// 🔹 Tipos de Props
// =====================
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

// =====================
// 🔹 Componente MenuItem
// =====================
const MenuItem: React.FC<MenuItemProps> = ({
  label,
  iconName,
  onPress,
  highlight,
}) => {
  return (
    <TouchableOpacity
      style={[styles.item, highlight && styles.highlightItem]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={iconName}
        size={24}
        color={highlight ? "#fff" : "#333"}
        style={styles.icon}
      />
      <Text style={[styles.label, highlight && styles.highlightLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// =====================
// 🔹 Componente Principal
// =====================
const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose }) => {
  const router = useRouter();

  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
  }, [visible, slideAnim, fadeAnim]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose} // Soporte botón "back" en Android
    >
      <View style={StyleSheet.absoluteFillObject}>
        {/* Fondo oscuro */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        {/* Menú lateral */}
        <Animated.View
          style={[
            styles.menu,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <Text style={styles.title}>Menú</Text>

          <MenuItem
            label="Inicio"
            iconName="home-outline"
            onPress={() => {
              onClose();
              router.push("/(tabs)/home");
            }}
          />
          <MenuItem
            label="Galería"
            iconName="images-outline"
            onPress={() => {
              onClose();
              router.push("/(tabs)/galeria");
            }}
          />
          <MenuItem
            label="Tienda"
            iconName="storefront-outline"
            onPress={() => {
              onClose();
              router.push("/(tabs)/tienda");
            }}
          />
          <MenuItem
            label="Eventos"
            iconName="calendar-outline"
            onPress={() => console.log("Eventos")}
          />
          <MenuItem
            label="Sobre Nosotros"
            iconName="information-circle-outline"
            onPress={() => console.log("Sobre Nosotros")}
          />
          <MenuItem
            label="Ayuda"
            iconName="help-circle-outline"
            onPress={() => console.log("Ayuda")}
          />

          <View style={styles.separator} />

          <MenuItem
            label="Iniciar Sesión"
            iconName="log-in-outline"
            highlight
            onPress={() => {
              onClose();
               router.push("/login");
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SideMenu;

// =====================
// 🔹 Estilos
// =====================
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
    backgroundColor: "#f9f9f9",
    paddingTop: Platform.OS === "android" ? 50 : 60,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#c47719ff",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  highlightItem: {
    backgroundColor: "#c47719ff",
    borderRadius: 6,
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 18,
    color: "#333",
  },
  highlightLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
});
