import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function QrScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aquí va tu QR</Text>
      {/* Podés usar expo-barcode-scanner o react-native-qrcode-svg */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
  },
});
