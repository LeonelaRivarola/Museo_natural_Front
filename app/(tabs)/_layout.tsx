import React, { useState } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, SafeAreaView, Platform } from "react-native";
import SideMenu from "../../components/organisms/SideMenu";

export default function TabsLayout() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: "#c47719ff" },
          headerTintColor: "#fff",
          tabBarActiveTintColor: "#c47719ff",
          tabBarInactiveTintColor: "#777",
          tabBarStyle:
            Platform.OS === "web"
              ? { display: "none" } // 🔥 Oculta la barra de tabs en la web
              : {
                  backgroundColor: "#fff",
                  paddingBottom: 5,
                  height: 60,
                  borderTopColor: "#ddd",
                  borderTopWidth: 1,
                },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => setMenuVisible(true)}
            >
              <Ionicons name="menu-outline" size={28} color="#fff" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitle: "Museo Natural",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="galeria"
          options={{
            title: "Galería",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="images-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="qr"
          options={{
            title: "QR",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="scan-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="tienda"
          options={{
            title: "Tienda",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="storefront-outline" color={color} size={size} />
            ),
          }}
        />
      </Tabs>

      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}
