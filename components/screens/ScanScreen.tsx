import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  // 🔥 Cerrar cámara a los 60 segundos
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.back();
    }, 60000);

    return () => clearTimeout(timeout);
  }, []);

  // cargando permisos
  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // sin permisos
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Necesitamos permiso para usar la cámara</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.btnText}>Dar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // cuando escanea
  const handleScan = ({ data }: { data: string }) => {
    setScanned(true);

    router.push(`/detail/4`);
  };

  return (
    <View style={styles.container}>

      {/* 🔙 BOTÓN VOLVER */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      {/* 📷 CÁMARA */}
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleScan}
      />

      {/* 🟧 RECUADRO */}
      <View style={styles.frame} />

      {/* 🔁 Botón para escanear de nuevo */}
      {scanned && (
        <TouchableOpacity
          style={styles.scanAgain}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.btnText}>Escanear de nuevo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 12 },
  button: {
    backgroundColor: "#C47719",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "600" },

  // BOTÓN VOLVER
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 50,
  },

  // RECUADRO QR
  frame: {
    position: "absolute",
    top: "25%",
    left: "12%",
    width: "76%",
    height: "45%",
    borderWidth: 4,
    borderColor: "#C47719",
    borderRadius: 20,
    zIndex: 10,
  },

  scanAgain: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#C47719",
    padding: 12,
    borderRadius: 10,
    zIndex: 20,
  },
});
