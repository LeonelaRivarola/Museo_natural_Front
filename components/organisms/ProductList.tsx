import config from "@/app/config/config";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

    fetch(`${config.BASE_URL}/productos.php`)
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
        `${config.BASE_URL}/eliminar_producto.php?id=${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setProductos(productos.filter((p) => p.id_producto !== id));
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

  const groupProducts = (items: any[]) => {
    const grouped: any[][] = [];
    for (let i = 0; i < items.length; i += 2) {
      grouped.push(items.slice(i, i + 2));
    }
    return grouped;
  };

  return (
    <View style={{ flex: 1 }}>
      {rol === 1 && (
        <TouchableOpacity style={styles.addBtn} onPress={() => router.push("/agregar-producto")}>
          <Ionicons name="add" size={22} color="#fff" />
          <Text style={styles.addText}>Agregar producto</Text>
        </TouchableOpacity>

      )}

      <FlatList
        data={groupProducts(productos)} // ahora cada item es un array de hasta 2 productos
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 25 }}>
            {item.map((prod: any) => (
              <ProductCard
                key={prod.id_producto}
                item={prod}
                isAdmin={rol === 1}
                onEdit={() => router.push(`/editar-producto?id=${prod.id_producto}`)}
                onDelete={() => eliminarProducto(prod.id_producto)}
              />
            ))}
            {item.length === 1 && <View style={{ flex: 1 }} />}
            {/* Esto agrega espacio si hay solo un producto en la fila */}
          </View>
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
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c47719",
    margin: 15,
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  addText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "bold",
  },
})