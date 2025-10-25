import React from "react";
import { View, Text, StyleSheet } from "react-native";

const QRScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Escanea un código QR para continuar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});

export default QRScreen;
