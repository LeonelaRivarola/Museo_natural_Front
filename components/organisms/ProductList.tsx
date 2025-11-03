import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProductCard from "../molecules/ProductCard";

export default function ProductList() {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rol, setRol] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cargarRol = async () => {
      const savedRol = await AsyncStorage.getItem("rol");
      setRol(savedRol ? parseInt(savedRol) : null);
    };
    cargarRol();

    fetch("http://192.168.0.151/ProyectoFinal/backend/productos.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Productos recibidos:", data);
        setProductos(data);
      })
      .catch((err) => {
        console.error("❌ Error al cargar productos:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const eliminarProducto = async (id: number) => {
    try {
      const res = await fetch(
        `http://192.168.0.151/ProyectoFinal/backend/eliminar_producto.php?id=${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setProductos(productos.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#c47719" />
      </View>
    );
  }

  if (productos.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No hay productos disponibles.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* 🔸 Si es admin, botón para agregar */}
      {rol === 1 && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#c47719",
            margin: 10,
            padding: 10,
            borderRadius: 8,
          }}
          onPress={() => router.push("/agregar-producto")}
        >
          <Ionicons name="add-circle-outline" size={22} color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 5, fontWeight: "bold" }}>
            Agregar producto
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id_producto.toString()}
        numColumns={Platform.OS === "web" ? 4 : 2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 25,
        }}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            isAdmin={rol === 1}
            onEdit={() => router.push(`/editar-producto?id=${item.id_producto}`)}
            onDelete={() => eliminarProducto(item.id_producto)}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 60,
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#f2f2f2",
},
contentWrapper: {
  flex: 1,
  width: "100%",
  maxWidth: 1200,
  alignSelf: "center",
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 20,
  marginTop: 100,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 10,
  elevation: 3,
},
})