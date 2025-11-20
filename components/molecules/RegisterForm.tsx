import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import InputField from "../atoms/InputField";

interface RegisterFormProps {
  nombre: string;
  apellido: string;
  usuario: string;
  password: string;
  setNombre: (text: string) => void;
  setApellido: (text: string) => void;
  setUsuario: (text: string) => void;
  setPassword: (text: string) => void;
}

export default function RegisterForm({
  nombre,
  apellido,
  usuario,
  password,
  setNombre,
  setApellido,
  setUsuario,
  setPassword }: RegisterFormProps)
 {
  return (
    <View style={styles.container}>
      <InputField
        placeholder="Nombre"
        icon="person-outline"
        value={nombre}
        onChangeText={setNombre}
      />

      <InputField
        placeholder="Apellido"
        icon="person-outline"
        value={apellido}
        onChangeText={setApellido}
      />

      <InputField
        placeholder="Usuario"
        icon="person-circle-outline"
        value={usuario}
        onChangeText={setUsuario}
      />

      <InputField
        placeholder="Contraseña"
        icon="lock-closed-outline"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    ...(Platform.OS === "web" && {
      maxWidth: 400,
      alignSelf: "center",
    }),
  },
});
