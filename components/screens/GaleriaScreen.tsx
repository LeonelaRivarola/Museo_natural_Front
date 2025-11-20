import config from "@/app/config/config";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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

// ← mapa para comparar ID numérico del backend
const categoryMap: Record<string, string> = {
    "Arqueología": "1",
    "Herbarios": "2",
    "Zoologia": "3",
    "Paleontología": "4",
};

// ← categorías en el orden que querés mostrar
const categories = ["Coleccion", "Arqueología", "Herbarios", "Zoologia", "Paleontología"];

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

    useEffect(() => {
        fetch(`${config.BASE_URL}/galeria/items.php`)
            .then(res => res.json())
            .then(data => {
                const fixed = data.map((i: any) => ({
                    id: Number(i.id),
                    titulo: i.titulo,
                    descripcion: i.descripcion,
                    category_id: i.category_id,
                    imagen: i.imagen,
                    images: i.images
                }));
                setItems(fixed);
            })
            .catch(err => console.log(err));
    }, []);

    // ← filtrado correcto
    const filteredImages =
        activeCategory === "Coleccion"
            ? items
            : items.filter(i => i.category_id === categoryMap[activeCategory]);

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
                                    params: { id: item.id.toString() }
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fafafa" },
    scrollContainer: { paddingTop: Platform.OS === "web" ? 120 : 20, paddingBottom: 60 },

    headerTitle: { fontSize: 30, fontWeight: "800", color: "#222", marginBottom: 20, paddingLeft: 16 },

    /** FILTROS **/
    filtersWrapper: { width: "100%", paddingLeft: 10, marginBottom: 25 },
    filtersRow: { flexDirection: "row", gap: 12 },
    filterChip: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 25, backgroundColor: "#ddd9d2" },
    filterChipActive: { backgroundColor: "#c47719" },
    filterText: { fontSize: 15, color: "#333", fontWeight: "600" },
    filterTextActive: { color: "#fff" },

    /** GRID **/
    grid: {
        width: "100%",
        paddingHorizontal: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        rowGap: 20,
        columnGap: 16,
    },

    /** CARD **/
    cardWeb: {
        width: Platform.OS === "web" ? "48%" : "100%",
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#eee",
        ...(Platform.OS === "web"
            ? { boxShadow: "0 4px 18px rgba(0,0,0,0.08)" }
            : { elevation: 3 }
        ),
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
        color: "#222",
        fontSize: 17,
        fontWeight: "700",
        lineHeight: 22,
    },
});
