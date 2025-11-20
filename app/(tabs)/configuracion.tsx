import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import NavbarWeb from "../../components/organisms/Navbar";
import NavMobil from "../../components/organisms/NavMobil";

export default function Configuracion() {
  const [bioEnabled, setBioEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [compatible, setCompatible] = useState(false);

  useEffect(() => {
    (async () => {
      const hardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setCompatible(hardware && enrolled);

      const savedBio = await AsyncStorage.getItem("bioEnabled");
      if (savedBio) setBioEnabled(savedBio === "true");

      const savedTheme = await AsyncStorage.getItem("darkMode");
      if (savedTheme) setDarkMode(savedTheme === "true");
    })();
  }, []);

  const toggleBiometria = async () => {
    if (!compatible) {
      Alert.alert("Error", "Tu dispositivo no tiene huella configurada.");
      return;
    }

    if (!bioEnabled) {
      const res = await LocalAuthentication.authenticateAsync({
        promptMessage: "Confirmá tu huella",
      });
      if (!res.success) {
        Alert.alert("Error", "No se pudo activar la huella.");
        return;
      }
    }

    const value = !bioEnabled;
    setBioEnabled(value);
    await AsyncStorage.setItem("bioEnabled", value.toString());
  };

  const toggleDarkMode = async () => {
    const value = !darkMode;
    setDarkMode(value);
    await AsyncStorage.setItem("darkMode", value.toString());
  };

  return (
    <View style={styles.screen}>
      {Platform.OS === "web" ? <NavbarWeb /> : <NavMobil />}

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Seguridad</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Usar huella digital</Text>
          <Switch value={bioEnabled} onValueChange={toggleBiometria} />
        </View>

        <Text style={styles.sectionTitle}>Apariencia</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Modo oscuro</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        <Text style={styles.sectionTitle}>Cuenta</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Cambiar contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Información</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Versión de la app: 1.0.0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Política de privacidad</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20, paddingBottom: 120 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: { fontSize: 16 },
  option: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  optionText: { fontSize: 16, color: "#555" },
});
