import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BottomNavMobile({ onMenuPress }: { onMenuPress?: () => void }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🏠 Inicio */}
      <TouchableOpacity style={styles.tab} onPress={() => router.push("/home")}>
        <Ionicons name="home-outline" size={24} color="#000" />
        <Text style={styles.label}>Inicio</Text>
      </TouchableOpacity>

      {/* 🖼️ Galería */}
      <TouchableOpacity style={styles.tab} onPress={() => router.push("/galeria")}>
        <Ionicons name="images-outline" size={24} color="#000" />
        <Text style={styles.label}>Galería</Text>
      </TouchableOpacity>

      {/* 📱 QR */}
      <TouchableOpacity style={styles.tab} onPress={() => router.push("/qr")}>
        <Ionicons name="qr-code-outline" size={24} color="#000" />
        <Text style={styles.label}>QR</Text>
      </TouchableOpacity>

      {/* 🛍️ Tienda */}
      <TouchableOpacity style={styles.tab} onPress={() => router.push("/(tabs)/tienda")}>
        <Ionicons name="storefront-outline" size={24} color="#000" />
        <Text style={styles.label}>Tienda</Text>
      </TouchableOpacity>

      {/* ☰ Menú lateral */}
      <TouchableOpacity style={styles.tab} onPress={onMenuPress}>
        <Ionicons name="menu-outline" size={26} color="#000" />
        <Text style={styles.label}>Más</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    elevation: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    ...(Platform.OS === "ios" && { paddingBottom: 20 }),
  },
  tab: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#000",
  },
});
