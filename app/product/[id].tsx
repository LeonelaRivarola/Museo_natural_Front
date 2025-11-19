import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavMobil from "../../components/organisms/BottomNavMobil";
import NavbarWeb from "../../components/organisms/Navbar";
import NavMobil from "../../components/organisms/NavMobil";
import config from "../config/config";


export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [producto, setProducto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${config.BASE_URL}/producto.php?id=${id}`)
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {Platform.OS === "web" ? <NavbarWeb /> : <NavMobil />}

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          Platform.OS !== "web" && styles.scrollContainerMobile,
        ]}
      >
        <View
          style={[
            styles.productContainer,
            Platform.OS === "web" && styles.productContainerWeb,
          ]}
        >
          <Image
            source={{
              uri:
                producto.imagen ||
                "https://via.placeholder.com/300x200?text=Sin+Imagen",
            }}
            style={styles.image}
            resizeMode="contain"
          />

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{producto.nombre}</Text>
            <Text style={styles.price}>
              ${parseFloat(producto.precio).toFixed(2)}
            </Text>
            <Text style={styles.desc}>
              {producto.descripcion || "Sin descripción disponible."}
            </Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#c47719" }]}
              >
                <Text style={styles.buttonText}>Comprar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#555" }]}
              >
                <Text style={styles.buttonText}>Agregar al carrito</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {Platform.OS !== "web" && <BottomNavMobil />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollContainerMobile: {
    paddingBottom: 120, // 🔸 espacio extra para que no tape la bottom nav
  },

  /** Layout principal **/
  productContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  productContainerWeb: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    maxWidth: 1200,
    marginHorizontal: "auto",
    gap: 50,
    paddingTop: 50,
    marginTop: 50
  },

  /** Imagen **/
  image: {
    width: Platform.OS === "web" ? 400 : "100%",
    height: Platform.OS === "web" ? 400 : 260,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
  },

  /** Detalles **/
  detailsContainer: {
    flex: 1,
    maxWidth: 600,
    width: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
    textAlign: Platform.OS === "web" ? "left" : "center",
  },
  price: {
    fontSize: 22,
    color: "#c47719",
    fontWeight: "700",
    marginBottom: 20,
    textAlign: Platform.OS === "web" ? "left" : "center",
  },
  desc: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
    marginBottom: 40,
    textAlign: "justify",
  },

  /** Botones **/
  buttonGroup: {
    flexDirection: Platform.OS === "web" ? "row" : "column",
    gap: 12,
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 180,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
