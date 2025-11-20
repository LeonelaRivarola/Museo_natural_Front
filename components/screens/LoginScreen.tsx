// app/login.tsx
import config from "@/app/config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import LoginSection from "../organisms/LoginSection";

const FIXED_USER = "leonelaR";
const FIXED_PASS = "hash_admin123";

export default function LoginScreen() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // 🌟 LOGIN CON HUELLA
  useEffect(() => {
    verificarBiometria();
  }, []);

  const verificarBiometria = async () => {
    const bio = await AsyncStorage.getItem("bioEnabled");
    if (bio !== "true") return;

    const res = await LocalAuthentication.authenticateAsync({
      promptMessage: "Ingresar con huella",
    });

    if (!res.success) return;

    // Login automático con usuario fijo
    await handleLogin(FIXED_USER, FIXED_PASS, true);
  };

  // LOGIN NORMAL
  const handleLogin = async (
    usr: string = usuario,
    pass: string = password,
    isBio: boolean = false
  ) => {
    if (!usr || !pass) {
      Alert.alert("Error", "Debe ingresar usuario y contraseña");
      return;
    }

    try {
      const res = await fetch(`${config.BASE_URL}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: usr, password: pass }),
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

        // 🌟 Guardar sesión
        await AsyncStorage.multiSet([
          ["token", data.token],
          ["user", JSON.stringify(userData)],
          ["rol", data.rol_id.toString()],
        ]);

        // 🌟 Solo guardamos el estado de huella si no es biométrica
        if (!isBio) {
          setUsuario(usr);
          setPassword(pass);
        }

        router.push("/(tabs)/home");
      } else {
        Alert.alert("Error", data.message || "Usuario o contraseña incorrectos");
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
      onSubmit={() => handleLogin()}
      onRegister={() => router.push("/registrar")}
    />
  );
}
