import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AgregarProducto() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);

  // 📸 Seleccionar imagen desde galería o cámara
  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (result.canceled) return;
    const asset = result.assets[0];
    const uri = asset.uri;
    const isWeb = uri.startsWith("data:image");

    try {
      setSubiendo(true);
      let res;

      if (isWeb || asset.base64) {
        const imagenBase64 = asset.base64
          ? `data:image/jpeg;base64,${asset.base64}`
          : uri;

        res = await fetch(
          "http://192.168.0.151/ProyectoFinal/backend/subir_imagen.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagen: imagenBase64 }),
          }
        );
      } else {
        const nombreArchivo = uri.split("/").pop() || "imagen.jpg";
        const tipo = nombreArchivo.endsWith(".png")
          ? "image/png"
          : "image/jpeg";

        const formData = new FormData();
        formData.append("imagen", {
          uri,
          name: nombreArchivo,
          type: tipo,
        } as any);

        res = await fetch(
          "http://192.168.0.151/ProyectoFinal/backend/subir_imagen.php",
          {
            method: "POST",
            body: formData,
          }
        );
      }

      const text = await res.text();
      console.log("📤 Respuesta subir_imagen.php:", text);

      const data = JSON.parse(text);
      if (data.status === 200) {
        setImagen(data.url);
        Alert.alert("Éxito", "Imagen subida correctamente");
      } else {
        Alert.alert("Error", data.message || "No se pudo subir la imagen");
      }
    } catch (err) {
      console.error("❌ Error al subir imagen:", err);
      Alert.alert("Error", "No se pudo subir la imagen");
    } finally {
      setSubiendo(false);
    }
  };

  // 🧾 Guardar producto
  const handleAgregar = async () => {
    if (!nombre || !precio) {
      Alert.alert("Error", "El nombre y el precio son obligatorios");
      return;
    }

    setGuardando(true);
    try {
      const res = await fetch(
        "http://192.168.0.151/ProyectoFinal/backend/agregar_producto.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre,
            precio,
            descripcion,
            imagen: imagen || "",
          }),
        }
      );

      const text = await res.text();
      console.log("📦 Respuesta agregar_producto.php:", text);

      const data = JSON.parse(text);

      if (data.success) {
        Alert.alert("Éxito", "Producto agregado correctamente", [
          {
            text: "Aceptar",
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert("Error", data.message || "No se pudo agregar el producto");
      }
    } catch (err) {
      console.error("❌ Error al agregar producto:", err);
      Alert.alert("Error", "Error al conectar con el servidor");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔸 Navbar simple arriba */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>🛍️ Nueva carga de producto</Text>
      </View>

      <Text style={styles.title}>Agregar Producto</Text>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <TextInput
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        style={[styles.input, { height: 100 }]}
      />

      {/* 📷 Botón de imagen */}
      <View style={styles.imageSection}>
        {imagen ? (
          <Image
            source={{ uri: imagen }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={{ color: "#888" }}>Sin imagen seleccionada</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.imageButton}
          onPress={seleccionarImagen}
          disabled={subiendo}
        >
          <Text style={styles.imageButtonText}>
            {subiendo ? "Subiendo..." : "📷 Seleccionar imagen"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🧾 Botón Guardar */}
      <TouchableOpacity
        style={[styles.button, guardando && { opacity: 0.7 }]}
        onPress={handleAgregar}
        disabled={guardando}
      >
        <Text style={styles.buttonText}>
          {guardando ? "Guardando..." : "Guardar producto"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: "#fff" },
  navbar: {
    backgroundColor: "#c47719",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
  },
  navTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  title: { fontSize: 22, fontWeight: "bold", color: "#c47719", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  imageSection: { marginBottom: 20, alignItems: "center" },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholderImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageButton: {
    backgroundColor: "#00000090",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  imageButtonText: { color: "#fff", fontWeight: "bold" },
  button: {
    backgroundColor: "#c47719",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
