import { useThemeColor } from "@/hooks/use-theme-color";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // ✅ Importar router
import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SideMenu from "../organisms/SideMenu";

export default function NavbarWeb() {
  const accentColor = useThemeColor({}, "tint");
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter(); // Hook para navegar
  const { user, logout } = useAuth(); //hook para saber si hay usuario

  // 🔹 Mobile 
  if (Platform.OS !== "web") {
    return (
      <View style={styles.navbarMobile}>
        <View style={styles.leftContainerMobile}>
          <Image
            source={require("../../assets/images/logo-sinfondo.png")}
            style={styles.logoMobile}
            resizeMode="contain"
          />
          <Text style={styles.titleMobile}>Museo Natural</Text>
        </View>

        <View style={styles.rightContainerMobile}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={26} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu-outline" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      </View>
    );
  }

  // 🔹 Web
  return (
    <View style={styles.navbarWrapper}>
      <View style={styles.navbar}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => router.push("/home")}>
            <Image
              source={require("../../assets/images/logo-sinfondo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.title}>Museo Natural</Text>
        </View>

        <View style={styles.rightContainer}>
          {/* ✅ Enlaces de navegación funcionales */}
          <View style={styles.navLinks}>
            <TouchableOpacity onPress={() => router.push("/home")}>
              <Text style={styles.link}>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/galeria")}>
              <Text style={styles.link}>Galería</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(tabs)/tienda")}>
              <Text style={styles.link}>Tienda</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/ayuda")}>
              <Text style={styles.link}>Ayuda</Text>
            </TouchableOpacity>
          </View>

           {/* 👇 Si el usuario está logueado, mostrar avatar */}
          {user ? (
            <TouchableOpacity onPress={logout} style={styles.avatarContainer}>
              <Ionicons name="person-circle-outline" size={32} color={accentColor} />
              <Text style={styles.userName}>{user.nombre}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: accentColor }]}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.loginText}>Iniciar sesión</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 🔹 Web
  navbarWrapper: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    ...(Platform.OS === "web"
      ? {
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }
      : {}),
  },
  navbar: {
    width: "90%",
    maxWidth: 1200,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 90,
    height: 55,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#000",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  navLinks: {
    flexDirection: "row",
    gap: 20,
  },
  link: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 25,
  },
  loginText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
   avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userName: {
    color: "#000",
    fontWeight: "500",
  },

  // 🔹 Mobile (Android / iOS)
  navbarMobile: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 4,
  },
  leftContainerMobile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rightContainerMobile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  logoMobile: {
    width: 45,
    height: 45,
  },
  titleMobile: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
