// app/login.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";
import LoginSection from "../organisms/LoginSection";


export default function LoginScreen() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!usuario || !password) {
      Alert.alert("Error", "Debe ingresar usuario y contraseña");
      return;
    }

    try {
      const res = await fetch("http://192.168.0.151/ProyectoFinal/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await res.json();
      console.log("Respuesta del backend:", data);

      if (data.status === 200) {
        const userData = {
          id: data.id,
          nombre: data.nombre,
          apellido: data.apellido,
          rol: data.rol_id,
        };

        await AsyncStorage.multiSet([
          ["token", data.token],
          ["user", JSON.stringify(userData)],
          ["rol", data.rol_id.toString()],
        ]);

        router.push("/(tabs)/home");

      } else {
        Alert.alert("Error", data.menssage || "Usuario o contraseña incorrectos");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor");
      console.error(error);
    }
  };

  return (
    <LoginSection
      usuario={usuario}
      password={password}
      setUsuario={setUsuario}
      setPassword={setPassword}
      onSubmit={handleLogin}
    />
  );
}
