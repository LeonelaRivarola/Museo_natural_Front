import { useThemeColor } from "@/hooks/use-theme-color";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavMobil from "../../components/organisms/BottomNavMobil";
import NavbarWeb from "../../components/organisms/Navbar";
import NavMobil from "../../components/organisms/NavMobil";
import config from "../config/config";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [producto, setProducto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const scheme = useColorScheme();

  // THEME COLORS
  const background = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const cardBg = useThemeColor({}, "background");
  const border = useThemeColor({}, "tabIconDefault");
  const priceColor = useThemeColor({}, "tint");
  const buttonPrimary = useThemeColor({}, "tint");
  const buttonSecondary = useThemeColor({}, "icon");

  const styles = getStyles(
    background,
    text,
    priceColor,
    cardBg,
    border,
    buttonPrimary,
    buttonSecondary
  );

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
        <ActivityIndicator size="large" color={priceColor} />
      </View>
    );
  }

  if (!producto) {
    return (
      <View style={styles.center}>
        <Text style={{ color: text }}>No se encontró el producto.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "web" ? <NavbarWeb /> : <NavMobil />}

  

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          Platform.OS !== "web" && styles.scrollContainerMobile,
        ]}
      >
        {/* Imagen del producto */}
        <View style={styles.imageWrapper}>
          {/* Botón dentro de la imagen */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color={scheme === "dark" ? "#000" : "#333"}/>
          </TouchableOpacity>

          <Image
            source={{
              uri: producto.imagen || "https://via.placeholder.com/400x400?text=Sin+Imagen",
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>


        {/* Detalles */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{producto.nombre}</Text>
          <Text style={styles.price}>
            ${parseFloat(producto.precio).toFixed(2)}
          </Text>
          <Text style={styles.desc}>
            {producto.descripcion || "Sin descripción disponible."}
          </Text>

          {/* Botones */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
              <Text style={styles.buttonText}>Comprar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
              <Text style={[styles.buttonText, scheme === "dark" && { color: "#413f3fff" }]}>
                Agregar al carrito
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {Platform.OS !== "web" && <BottomNavMobil onMenuPress={() => { }} />}
    </SafeAreaView>
  );
}

/* ------------------ THEMED STYLES ------------------ */
const getStyles = (
  background: string,
  text: string,
  priceColor: string,
  cardBg: string,
  border: string,
  buttonPrimary: string,
  buttonSecondary: string
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
    },

    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: background,
    },

    scrollContainer: {
      flexGrow: 1,
      padding: 20,
    },

    scrollContainerMobile: {
      paddingBottom: 120,
    },

    imageWrapper: {
      width: "100%",
      alignItems: "center",
      marginBottom: 20,
      position: "relative",
    },

    image: {
      width: Platform.OS === "web" ? 450 : "95%",
      height: Platform.OS === "web" ? 450 : 300,
      borderRadius: 15,
      backgroundColor: cardBg,
      borderWidth: 1,
      borderColor: border,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 4,
    },

    detailsContainer: {
      flex: 1,
      width: "100%",
      maxWidth: 650,
      backgroundColor: Platform.OS === "web" ? "#fff" : cardBg,
      padding: 20,
      borderRadius: 15,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
      alignSelf: "center",
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: text,
      marginBottom: 10,
      textAlign: "center",
    },

    price: {
      fontSize: 24,
      fontWeight: "700",
      color: priceColor,
      marginBottom: 15,
      textAlign: "center",
    },

    desc: {
      fontSize: 16,
      color: text,
      lineHeight: 24,
      marginBottom: 30,
      textAlign: "justify",
    },

    buttonGroup: {
      flexDirection: Platform.OS === "web" ? "row" : "column",
      gap: 15,
      justifyContent: "center",
    },

    button: {
      flex: 1,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      minWidth: 180,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      elevation: 3,
    },

    buttonPrimary: {
      backgroundColor: buttonPrimary,
    },

    buttonSecondary: {
      backgroundColor: buttonSecondary,
    },

    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#fff",
    },

    backButton: {
      position: "absolute",
      top: Platform.OS === "web" ? 20 : 10,
      left: Platform.OS === "web" ? 20 : 10,
      zIndex: 20,
      width: 45,
      height: 45,
      borderRadius: 22.5,
      backgroundColor: "rgba(255,255,255,0.9)",
      justifyContent: "center",
      alignItems: "center",

      shadowColor: "#000",
      shadowOpacity: 0.18,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 3,
    },

  });
