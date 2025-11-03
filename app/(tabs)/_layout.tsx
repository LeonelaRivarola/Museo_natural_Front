import BottomNavMobile from "@/components/organisms/BottomNavMobil";
import SideMenu from "@/components/organisms/SideMenu";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Platform, View } from "react-native";

export default function TabsLayout() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* 🔹 Stack maneja las pantallas dentro de las tabs */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* 🔹 En mobile mostramos la barra inferior y el menú lateral */}
      {Platform.OS !== "web" && (
        <>
          <BottomNavMobile onMenuPress={() => setMenuVisible(true)} />
          <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
        </>
      )}
    </View>
  );
}
