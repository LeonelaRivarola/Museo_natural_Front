import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [producto, setProducto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://172.17.135.163/ProyectoFinal/backend/producto.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setProducto(data))
      .catch((err) => console.error("❌ Error al cargar producto:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#c47719" />
      </View>
    );
  }

  if (!producto) {
    return (
      <View style={styles.center}>
        <Text>No se encontró el producto.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: producto.imagen || "https://via.placeholder.com/300x200?text=Sin+Imagen",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{producto.nombre}</Text>
      <Text style={styles.price}>${parseFloat(producto.precio).toFixed(2)}</Text>
      <Text style={styles.desc}>{producto.descripcion || "Sin descripción disponible."}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Comprar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: "#c47719",
    fontWeight: "600",
    marginBottom: 10,
  },
  desc: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#c47719",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
