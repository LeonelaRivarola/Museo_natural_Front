import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VisitBanner() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Querés visitarnos?</Text>

      <Text style={styles.text}>
        Podés venir en nuestros horarios abiertos al público o coordinar una 
        visita guiada para escuelas, grupos o turistas.
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          onPress={() => router.push("/visitas")}
        >
          <Text style={styles.buttonText}>Agendar visita</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondary]}
          onPress={() => router.push("/horarios")}
        >
          <Text style={styles.buttonTextSecondary}>Ver horarios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#f0e4d4",
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 30,
    borderLeftWidth: 6,
    borderLeftColor: "#c47719",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#3f3830",
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: "#463f37",
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#c47719",
  },
  secondary: {
    borderWidth: 2,
    borderColor: "#c47719",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  buttonTextSecondary: {
    color: "#c47719",
    fontWeight: "700",
    fontSize: 15,
  },
});
