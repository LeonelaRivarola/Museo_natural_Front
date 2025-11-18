import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function HorarioCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Horarios de visita</Text>
      <Text style={styles.text}>
        Lunes a Viernes: 8 a 13 hs y 14 a 19 hs
      </Text>
      <Text style={styles.text}>
        Sábados y Domingos: 18:00 a 20:00 hs
      </Text>
      <Text style={styles.highlight}>Acceso Libre y Gratuito</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    marginHorizontal: Platform.OS === "web" ? "20%" : 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: Platform.OS === "web" ? "#f9f9f9" : "#e27713",
    borderWidth: Platform.OS === "web" ? 1 : 0,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // sombra en Android
    alignItems: "center",
  },
  title: {
    fontSize: Platform.OS === "web" ? 24 : 20,
    fontWeight: "700",
    marginBottom: 10,
    color: Platform.OS === "web" ? "#333" : "#fff",
  },
  text: {
    fontSize: Platform.OS === "web" ? 18 : 16,
    color: Platform.OS === "web" ? "#555" : "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  highlight: {
    fontSize: Platform.OS === "web" ? 18 : 16,
    fontWeight: "700",
    marginTop: 10,
    color: Platform.OS === "web" ? "#c47719" : "#fff",
  },
});
