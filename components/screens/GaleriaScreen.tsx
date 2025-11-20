import config from "@/app/config/config";
import { useThemeColor } from "@/hooks/use-theme-color";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarWeb from "../../components/organisms/Navbar";
import NavMobil from "../../components/organisms/NavMobil";

// map categorías
const categoryMap: Record<string, string> = {
  Arqueología: "1",
  Herbarios: "2",
  Zoologia: "3",
  Paleontología: "4",
};

const categories = [
  "Coleccion",
  "Arqueología",
  "Herbarios",
  "Zoología",
  "Paleontología",
];

type Item = {
  id: number;
  titulo: string;
  descripcion: string;
  category_id: string;
  imagen: string;
  images: string[];
};

export default function GaleriaScreen() {
  const [activeCategory, setActiveCategory] = useState("Coleccion");
  const [items, setItems] = useState<Item[]>([]);
  const { categoria } = useLocalSearchParams();

  // THEME COLORS
  const background = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const cardBg = useThemeColor({}, "background");
  const border = useThemeColor({}, "tabIconDefault");
  const chipBg = useThemeColor({}, "tabIconDefault");
  const chipActiveBg = useThemeColor({}, "tint");
  const chipText = useThemeColor({}, "text");
  const cardTitle = useThemeColor({}, "text");

  const styles = getStyles(
    background,
    text,
    chipBg,
    chipActiveBg,
    chipText,
    border,
    cardBg,
    cardTitle
  );

  useEffect(() => {
    if (categoria && typeof categoria === "string") {
      setActiveCategory(categoria);
    }
  }, [categoria]);

  useEffect(() => {
    fetch(`${config.BASE_URL}/galeria/items.php`)
      .then((res) => res.json())
      .then((data) => {
        const fixed = data.map((i: any) => ({
          id: Number(i.id),
          titulo: i.titulo,
          descripcion: i.descripcion,
          category_id: i.category_id,
          imagen: i.imagen,
          images: i.images,
        }));
        setItems(fixed);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredImages =
    activeCategory === "Coleccion"
      ? items
      : items.filter((i) => i.category_id === categoryMap[activeCategory]);

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "web" ? <NavbarWeb /> : <NavMobil />}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Galería del Museo</Text>

        {/* FILTROS */}
        <View style={styles.filtersWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filtersRow}>
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setActiveCategory(cat)}
                    style={[
                      styles.filterChip,
                      isActive && styles.filterChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        isActive && styles.filterTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* GRID */}
        <View style={styles.grid}>
          {filteredImages.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "/detail/[id]",
                  params: { id: item.id.toString() },
                })
              }
            >
              <View style={styles.cardWeb}>
                <View style={styles.overlayWeb}>
                  <Text style={styles.cardText}>{item.titulo}</Text>
                </View>
                <Image source={{ uri: item.imagen }} style={styles.imageWeb} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ------------------ THEME STYLES ------------------ */

const getStyles = (
  background: string,
  text: string,
  chipBg: string,
  chipActiveBg: string,
  chipText: string,
  border: string,
  cardBg: string,
  cardTitle: string
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
    },

    scrollContainer: {
      paddingTop: Platform.OS === "web" ? 120 : 20,
      paddingBottom: 60,
    },

    headerTitle: {
      fontSize: 30,
      fontWeight: "800",
      color: text,
      marginBottom: 20,
      paddingLeft: 16,
    },

    /* FILTROS */
    filtersWrapper: {
      width: "100%",
      paddingLeft: 10,
      marginBottom: 25,
    },

    filtersRow: {
      flexDirection: "row",
      gap: 12,
    },

    filterChip: {
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 25,
      backgroundColor: chipBg,
    },

    filterChipActive: {
      backgroundColor: chipActiveBg,
    },

    filterText: {
      fontSize: 15,
      color: "#fff",
      fontWeight: "600",
    },

    filterTextActive: {
      color: "#fff",
    },

    /* GRID */
    grid: {
      width: "100%",
      paddingHorizontal: 16,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      rowGap: 20,
      columnGap: 16,
    },

    /* CARD */
    cardWeb: {
      width: Platform.OS === "web" ? "48%" : "100%",
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: cardBg,
      borderWidth: 1,
      borderColor: border,
      ...(Platform.OS === "web"
        ? { boxShadow: "0 4px 18px rgba(0,0,0,0.12)" }
        : { elevation: 3 }),
      aspectRatio: 1,
    },

    imageWeb: {
      width: "100%",
      height: "70%",
      resizeMode: "cover",
    },

    overlayWeb: {
      height: "30%",
      padding: 12,
      justifyContent: "center",
    },

    cardText: {
      color: cardTitle,
      fontSize: 17,
      fontWeight: "700",
      lineHeight: 22,
    },
  });
