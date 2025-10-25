import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import InputField from "../atoms/InputField";

interface Props {
  usuario: string;
  password: string;
  setUsuario: (text: string) => void;
  setPassword: (text: string) => void;
}

export default function LoginForm({
  usuario,
  password,
  setUsuario,
  setPassword,
}: Props) {
  return (
    <View style={styles.container}>
      <InputField
        placeholder="Usuario"
        icon="person-outline"
        value={usuario}
        onChangeText={setUsuario}
      />

      <InputField
        placeholder="Contraseña"
        icon="lock-closed-outline"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.footerText}>¿Has olvidado la contraseña?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 20,
    ...(Platform.OS === "web" && {
      maxWidth: 400,
      alignSelf: "center",
    }),
  },
  footerText: {
    fontSize: 12,
    color: "#555",
    marginTop: 8,
    textAlign: "center",
  },
});
