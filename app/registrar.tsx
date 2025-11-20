import config from "@/app/config/config";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";
import RegisterSection from "../components/organisms/RegisterSection";

export default function RegisterScreen() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    if (!nombre || !apellido || !usuario || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch(`${config.BASE_URL}/register.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          usuario,
          password,
        }),
      });

      const data = await res.json();
      console.log("Respuesta backend:", data);

      if (data.status === 200) {
        Alert.alert("Éxito", "Usuario registrado correctamente");
        router.push("/login");
      } else {
        Alert.alert("Error", data.message || "No se pudo registrar");
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  };

  return (
    <RegisterSection
      nombre={nombre}
      apellido={apellido}
      usuario={usuario}
      password={password}
      setNombre={setNombre}
      setApellido={setApellido}
      setUsuario={setUsuario}
      setPassword={setPassword}
      onSubmit={handleRegister}
      onLogin={() => router.push("/login")}
    />
  );
}
