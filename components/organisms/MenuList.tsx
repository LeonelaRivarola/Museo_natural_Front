import React from "react";
import { View, StyleSheet } from "react-native";
import MenuItem from "../molecules/MenuItem";
import { useRouter } from "expo-router";

export default function MenuList() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MenuItem label="Perfil" iconName="person-outline" onPress={() => console.log("Perfil")} />
      <MenuItem label="Eventos" iconName="calendar-outline" onPress={() => console.log("Eventos")} />
      <MenuItem label="Galería" iconName="images-outline" onPress={() => router.push("/(tabs)/galeria")} />
      <MenuItem label="Tienda" iconName="storefront-outline" onPress={() => router.push("/(tabs)/tienda")} />
      <MenuItem label="Sobre Nosotros" iconName="information-circle-outline" onPress={() => console.log("Sobre Nosotros")} />
      <MenuItem label="Ayuda" iconName="help-circle-outline" onPress={() => console.log("Ayuda")} />

      {/* Sección de inicio/cierre de sesión */}
      <View style={styles.separator} />
      <MenuItem
        label="Iniciar Sesión"
        iconName="log-in-outline"
        highlight
        onPress={() => router.push("../components/screens/LoginScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  separator: { height: 1, backgroundColor: "#ccc", marginVertical: 8 },
});
