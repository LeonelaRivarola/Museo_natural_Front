import NavbarMobile from "@/components/organisms/NavMobil";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import BottomNav from "../components/organisms/BottomNavMobil";
import config from "./config/config";


// Interfaz para el objeto de archivo que requiere FormData en RN
interface FileObject {
  uri: string;
  name: string;
  type: string;
}

export default function AgregarProducto() {
  const router = useRouter();
  // const router = useRouter(); // COMENTADO para evitar error de importación
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  // Nuevas variables de estado para campos de DB
  const [stock, setStock] = useState("");
  const [idCategoria, setIdCategoria] = useState("");

  const [imagen, setImagen] = useState<string | null>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);

  // Muestra una alerta simple
  const showAlert = (title: string, message: string) => {
    // Usamos Alert de React Native
    Alert.alert(title, message);
  };

  // 1. FUNCIÓN DE SUBIDA DE IMAGEN
  const subirImagen = async (): Promise<string | null> => {
    if (!imagen) return null;
    setSubiendo(true);

    try {
      // Intentamos obtener el nombre de archivo del URI o usamos un valor por defecto
      const nombreArchivo = imagen.split("/").pop() || "imagen.jpg";
      // Determina el tipo mime.
      const tipo = nombreArchivo.endsWith(".png") ? "image/png" : "image/jpeg";

      const formData = new FormData();

      const fileToUpload: FileObject = {
        uri: imagen,
        name: nombreArchivo,
        type: tipo,
      };

      formData.append("archivo", fileToUpload as any);

      console.log("📸 Imagen URI:", imagen);
      console.log("📦 Enviando a:", `${config.BASE_URL}/subir_imagen_producto.php`);

      const res = await fetch(`${config.BASE_URL}/subir_imagen_producto.php`, {
        method: "POST",
        // Importante: NO establecer el Content-Type, FormData lo hace automáticamente
        body: formData,
      });

      const text = await res.text();
      // Muestra la respuesta del servidor (CLAVE para depurar)
      console.log("📦 Respuesta subir_imagen_producto.php (RAW):", text);

      try {
        const data = JSON.parse(text);

        if (data.success) return data.nombreArchivo;
        else {
          // Muestra el error detallado de PHP
          showAlert("Error de subida", data.error || "No se pudo subir la imagen");
          return null;
        }
      } catch (e) {
        // Si JSON.parse falla, significa que el PHP arrojó un error de sintaxis/texto/warning antes del JSON
        showAlert("Error de Servidor", "El script PHP devolvió una respuesta no válida. Revisa la consola (RAW).");
        return null;
      }

    } catch (err) {
      console.error("❌ Error al subir imagen:", err);
      // Este es el error típico de conexión
      showAlert("Error de Conexión", "Error al conectar con el servidor para subir imagen. Verifica tu BASE_URL (IP) y CORS.");
      return null;
    } finally {
      setSubiendo(false);
    }
  };


  // 2. FUNCIÓN DE SELECCIÓN DE IMAGEN
  const seleccionarImagen = async () => {
    // Nota: Necesitarás permisos de galería configurados en app.json de Expo
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showAlert("Permiso Requerido", "Necesitamos acceso a tu galería para seleccionar imágenes.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImagen(asset.uri);
    }
  };

  // 3. FUNCIÓN PRINCIPAL DE AGREGAR PRODUCTO
  const handleAgregar = async () => {
    if (!nombre || !precio) {
      showAlert("Error", "El nombre y el precio son obligatorios");
      return;
    }

    setGuardando(true);

    try {
      let nombreImagen: string | null = null;
      if (imagen) {
        // 1. Subir la imagen primero y obtener el nombre del archivo en el servidor
        nombreImagen = await subirImagen();
        if (!nombreImagen) {
          setGuardando(false);
          return; // Si falla la subida, se detiene
        }
      }

      // 2. Preparar los datos del producto para la base de datos
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("precio", precio);
      formData.append("descripcion", descripcion);
      if (nombreImagen) formData.append("imagen", nombreImagen); // Nombre subido
      // Añadimos stock y categoría para que coincida con tu DB
      // El valor por defecto "NULL" o "0" dependerá de cómo maneje tu script PHP los valores vacíos
      formData.append("id_categoria", idCategoria || "NULL");
      formData.append("stock", stock || "0");

      console.log("📦 Guardando producto en DB...");

      const res = await fetch(`${config.BASE_URL}/agregar_producto.php`, {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      console.log("📦 Respuesta agregar_producto.php (RAW):", text);

      try {
        const data = JSON.parse(text);

        if (data.status === 200) {
          Alert.alert(
            "Éxito",
            "Producto agregado correctamente",
            [
              {
                text: "OK",
                onPress: () => router.push("/tienda"),
              },
            ]
          );
        } else {
          showAlert("Error al guardar", data.message || "No se pudo agregar el producto");
        }
      } catch (parseError) {
        // Error de parseo (típico si PHP arroja un Warning/Error antes del JSON)
        showAlert("Error de Servidor", "El servidor devolvió una respuesta no válida. Revisa la consola para ver el error RAW.");
      }

    } catch (err) {
      console.error("❌ Error al agregar producto:", err);
      showAlert("Error de Conexión", "Error al conectar con el servidor principal.");
    } finally {
      setGuardando(false);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>

      <NavbarMobile />

      {/* CONTENIDO PRINCIPAL */}
      <ScrollView contentContainerStyle={styles.formWrapper}>
        <View style={styles.card}>

          <Text style={styles.screenTitle}>Cargar nuevo producto</Text>

          {/* Inputs */}
          <TextInput
            placeholder="Nombre del producto"
            placeholderTextColor="#aaa"
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
          />

          <TextInput
            placeholder="Precio"
            placeholderTextColor="#aaa"
            value={precio}
            onChangeText={setPrecio}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Stock"
            placeholderTextColor="#aaa"
            value={stock}
            onChangeText={setStock}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Descripción"
            placeholderTextColor="#aaa"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            style={[styles.input, styles.textArea]}
          />

          {/* Imagen */}
          <Text style={styles.label}>Imagen del producto</Text>

          {imagen ? (
            <Image source={{ uri: imagen }} style={styles.previewImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={{ color: "#aaa" }}>Sin imagen seleccionada</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={seleccionarImagen}
            disabled={subiendo}
          >
            <Text style={styles.secondaryButtonText}>
              {subiendo ? "Subiendo..." : "Seleccionar imagen"}
            </Text>
          </TouchableOpacity>

          {/* Botón guardar */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleAgregar}
            disabled={guardando}
          >
            <Text style={styles.primaryButtonText}>
              {guardando ? "Guardando..." : "Guardar producto"}
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
      <BottomNav onMenuPress={() => { }} />
    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  formWrapper: {
    paddingTop: 30,
    paddingBottom: 90,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  screenTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    color: "#c47719",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fafafa",
    fontSize: 15,
  },

  textArea: {
    height: 100,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#555",
  },

  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },

  placeholderImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#efefef",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  primaryButton: {
    backgroundColor: "#c47719",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
