import React, { useState } from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarWeb from "../../components/organisms/Navbar";
import NavMobil from "../../components/organisms/NavMobil";

const categories = ["Todo", "Eventos", "Colecciones", "Talleres"];

const order = ["Eventos", "Colecciones", "Talleres"];

const allImages = [
  { id: 1, title: "Evento Cultural", category: "Eventos", image: require("../../assets/images/gallery1.jpg") },
  { id: 2, title: "Colección de Arte", category: "Colecciones", image: require("../../assets/images/gallery2.jpg") },
  { id: 3, title: "Taller de Cerámica", category: "Talleres", image: require("../../assets/images/gallery3.jpg") },
  { id: 4, title: "Muestra Patrimonial", category: "Colecciones", image: require("../../assets/images/gallery2.jpg") },
];

export default function GaleriaScreen() {
  const [activeCategory, setActiveCategory] = useState("Todo");

  const filteredImages =
    activeCategory === "Todo"
      ? [...allImages].sort(
          (a, b) => order.indexOf(a.category) - order.indexOf(b.category)
        )
      : allImages.filter((img) => img.category === activeCategory);

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "web" ? <NavbarWeb /> : <NavMobil />}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Galería del Museo</Text>

        {/* Filtros */}
        <View style={styles.tabs}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.tabButton,
                activeCategory === cat && styles.tabButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeCategory === cat && styles.tabTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Grid estilo blog (web + mobile iguales) */}
        <View style={styles.grid}>
          {filteredImages.map((item) => (
            <View key={item.id} style={styles.cardWeb}>
              <Image source={item.image} style={styles.imageWeb} resizeMode="cover" />
              <View style={styles.overlayWeb}>
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { paddingTop: Platform.OS === "web" ? 120 : 20, paddingBottom: 100, alignItems: "center" },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#222", marginBottom: 20 },

  /** Filtros **/
  tabs: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 10, marginBottom: 25 },
  tabButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: "#f2f2f2" },
  tabButtonActive: { backgroundColor: "#c47719" },
  tabText: { color: "#555", fontWeight: "600" },
  tabTextActive: { color: "#fff" },

  /** Grid estilo Blog **/
  grid: {
    width: "90%",
    maxWidth: 1200,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  cardWeb: {
    width: Platform.OS === "web" ? "30%" : "45%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#eee",
    ...(Platform.OS === "web" ? { boxShadow: "0 4px 10px rgba(0,0,0,0.1)" } : {}),
  },
  imageWeb: { width: "100%", height: 200 },
  overlayWeb: { padding: 10, backgroundColor: "rgba(0,0,0,0.4)" },
  cardText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
