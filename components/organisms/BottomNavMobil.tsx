import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SideMenu from "./SideMenu";

type ValidPaths = "/home" | "/galeria" | "/qr" | "/tienda" | "/menu";

type BottomNavMobileProps = {
  onMenuPress: () => void;
};

export default function BottomNavMobile({ onMenuPress }: BottomNavMobileProps) {
  const pathname = usePathname();
  const router = useRouter();
  const accentColor = useThemeColor({}, "tint");
  const [menuVisible, setMenuVisible] = useState(false);

  const tabs: { name: string; label: string; path: ValidPaths; icon: string }[] = [
    { name: "home", label: "Inicio", path: "/home", icon: "home-outline" },
    { name: "galeria", label: "Galería", path: "/galeria", icon: "images-outline" },
    { name: "qr", label: "QR", path: "/qr", icon: "qr-code-outline" },
    { name: "tienda", label: "Tienda", path: "/tienda", icon: "cart-outline" },
    { name: "menu", label: "Menu", path: "/tienda", icon: "menu-outline" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => {
              if (tab.name === "menu") {
                onMenuPress();
              } else {
                router.push(tab.path as any);
              }
            }}
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
