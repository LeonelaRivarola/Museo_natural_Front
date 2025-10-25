import React from "react";
import { TextInput, StyleSheet, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export default function InputField({
  placeholder,
  icon,
  value,
  onChangeText,
  secureTextEntry,
}: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={20} color="#c47719" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
    // Para plataformas web, ajustamos el tamaño y el ancho
    ...(Platform.OS === "web" && {
      width: "100%",
      maxWidth: 500, // Definimos un tamaño máximo para no hacer el input demasiado grande en pantallas grandes
      marginLeft: "auto",
      marginRight: "auto",
    }),
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: "#333",
    fontSize: 16, // Ajustamos el tamaño de la fuente para que sea más legible
    ...(Platform.OS === "web" && {
      fontSize: 18, // Aumentamos el tamaño de la fuente para web para una mejor legibilidad
    }),
  },
});
