import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavMobil from "../../components/organisms/BottomNavMobil";
import NavbarWeb from "../../components/organisms/Navbar";
import NavMobil from "../../components/organisms/NavMobil";

const { width } = Dimensions.get("window");

const categories = ["Todo", "Eventos", "Exposiciones", "Talleres"];

const allImages = [
  { id: 1, title: "Evento Cultural", category: "Eventos", image: require("../../assets/images/gallery1.jpg") },
  { id: 2, title: "Exposición de Arte", category: "Exposiciones", image: require("../../assets/images/gallery2.jpg") },
  { id: 3, title: "Taller de Cerámica", category: "Talleres", image: require("../../assets/images/gallery3.jpg") },
  { id: 4, title: "Muestra Patrimonial", category: "Exposiciones", image: require("../../assets/images/gallery2.jpg") },
];

export default function GaleriaScreen() {
  const [activeCategory, setActiveCategory] = useState("Todo");

  const filteredImages =
    activeCategory === "Todo"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.cardText}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "web" ? <NavbarWeb /> : <NavMobil />}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Título */}
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

        {/* Galería */}
        {Platform.OS === "web" ? (
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
        ) : (
          <FlatList
            data={filteredImages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        )}
      </ScrollView>

      {Platform.OS !== "web" && <BottomNavMobil />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingTop: Platform.OS === "web" ? 120 : 20,
    paddingBottom: 100,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 20,
  },

  /** Filtros **/
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 25,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  tabButtonActive: {
    backgroundColor: "#c47719",
  },
  tabText: {
    color: "#555",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#fff",
  },

  /** Galería - Mobile **/
  card: {
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  image: {
    width: width * 0.7,
    height: 220,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

   /** Galería - Web **/
  grid: Platform.select({
    web: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 25,
      width: "90%",
      maxWidth: 1200,
    },
    default: {},
  }),
  cardWeb: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    ...(Platform.OS === "web" ? { boxShadow: "0 4px 10px rgba(0,0,0,0.1)" } : {}),
  },
  imageWeb: {
    width: "100%",
    height: 250,
  },
  overlayWeb: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
  },

});
