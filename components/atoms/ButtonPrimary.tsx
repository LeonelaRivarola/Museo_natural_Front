import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";

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
    ...(Platform.OS === "web" && {
      minWidth: 200, // Botón más grande en la web
      paddingHorizontal: 20,
    }),
  },
  text: {
    color: "#fff",
    fontSize: 16,
    ...(Platform.OS === "web" && {
      fontSize: 18, // Aumentar el tamaño de fuente en la web
    }),
  },
});
