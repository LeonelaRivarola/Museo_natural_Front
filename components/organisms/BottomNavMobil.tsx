import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SideMenu from "./SideMenu";

type ValidPaths = "/home" | "/galeria" | "/tienda" | "/ayuda";

export default function BottomNavMobile() {
  const pathname = usePathname();
  const router = useRouter();
  const accentColor = useThemeColor({}, "tint");
  const [menuVisible, setMenuVisible] = useState(false);

  const tabs: { name: string; label: string; path: ValidPaths; icon: string }[] = [
    { name: "home", label: "Inicio", path: "/home", icon: "home-outline" },
    { name: "galeria", label: "Galería", path: "/galeria", icon: "images-outline" },
    { name: "tienda", label: "Tienda", path: "/tienda", icon: "cart-outline" },
    { name: "ayuda", label: "Ayuda", path: "/ayuda", icon: "help-circle-outline" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(tab.path)}
            style={styles.tabButton}
          >
            <Ionicons
              name={tab.icon as any}
              size={26}
              color={isActive ? accentColor : "#888"}
            />
            <Text style={[styles.label, isActive && { color: accentColor, fontWeight: "700" }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Botón de menú */}
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
        <Ionicons name="menu-outline" size={28} color={accentColor} />
      </TouchableOpacity>

      {/* SideMenu Modal */}
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 65,
    borderTopWidth: 1,
    borderColor: "#ddd",
    elevation: 8,
    position: "relative",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 2,
    color: "#444",
  },
  menuButton: {
    position: "absolute",
    right: 10,
  },
});
