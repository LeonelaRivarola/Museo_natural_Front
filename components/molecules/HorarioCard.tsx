import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HorarioCard() {
  return (
    <View style={styles.container}>
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
  container: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#f0e4d4",
    marginTop: 10,
    marginBottom: 30,
    borderLeftWidth: 6,
    borderLeftColor: "#c47719"
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
    color: "#3f3830",
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    color: "#463f37",
    marginBottom: 5,
    textAlign: "center",
  },
  highlight: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 10,
    color: "#c47719",
    textAlign: "center",
  },
});
