import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
}

export default function ButtonPrimary({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c47719",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // ✅ ocupa todo el ancho disponible en mobile
    ...(Platform.OS === "web" && {
      width: "auto", // ✅ en web el ancho se ajusta al contenido
      minWidth: 200,
      paddingHorizontal: 24,
    }),
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    ...(Platform.OS === "web" && {
      fontSize: 18,
    }),
  },
});
