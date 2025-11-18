import { useThemeColor } from "@/hooks/use-theme-color";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
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

type NavbarWebProps = {
  active?: string; // puede venir o no
};

export default function NavbarWeb({ active }: NavbarWebProps) {
  const accentColor = useThemeColor({}, "tint");
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // 🔹 Detectar ruta actual
  const { user, logout } = useAuth();

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
  const links: { name: string; path: `/home` | `/galeria` | `/tienda` | `/ayuda` }[] = [
  { name: "Inicio", path: "/home" },
  { name: "Galería", path: "/galeria" },
  { name: "Tienda", path: "/tienda" },
  { name: "Ayuda", path: "/ayuda" },
];


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
          <View style={styles.navLinks}>
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <TouchableOpacity
                  key={link.path}
                  onPress={() => router.push(link.path)}
                >
                  <Text
                    style={[
                      styles.link,
                      isActive && { color: accentColor, fontWeight: "700" },
                    ]}
                  >
                    {link.name}
                  </Text>
                  {isActive && <View style={[styles.activeBar, { backgroundColor: accentColor }]} />}
                </TouchableOpacity>
              );
            })}
          </View>

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
    paddingVertical: 10,
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
    width: 85,
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
    gap: 30,
  },
  navLinks: {
    flexDirection: "row",
    gap: 25,
    alignItems: "center",
  },
  link: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    paddingBottom: 6,
  },
  activeBar: {
    height: 3,
    borderRadius: 2,
    marginTop: 3,
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
  // 🔹 Mobile
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
