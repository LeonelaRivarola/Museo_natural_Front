// app/agregar-producto.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function AgregarProducto() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  const handleAgregar = async () => {
    if (!nombre || !precio) {
      Alert.alert("Error", "El nombre y el precio son obligatorios");
      return;
    }

    try {
      const res = await fetch("http://192.168.0.151/ProyectoFinal/backend/agregar_producto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio, descripcion, imagen }),
      });

      const data = await res.json();

      if (data.status === 200) {
        Alert.alert("Éxito", "Producto agregado correctamente");
        router.back(); // vuelve a la tienda
      } else {
        Alert.alert("Error", data.message || "No se pudo agregar el producto");
      }
    } catch (err) {
      console.error("❌ Error al agregar producto:", err);
      Alert.alert("Error", "Error al conectar con el servidor");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agregar Producto</Text>

      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
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
      <TextInput
        placeholder="URL de imagen (opcional)"
        value={imagen}
        onChangeText={setImagen}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleAgregar}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", color: "#c47719", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#c47719",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
