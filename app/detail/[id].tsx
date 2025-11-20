import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import config from "../config/config";


import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../../components/organisms/BottomNavMobil"; // tu bottom navbar seguro está así
import NavbarWeb from "../../components/organisms/Navbar";
import NavMobil from "../../components/organisms/NavMobil";

interface MuseoItem {
    id: number;
    titulo: string;
    category_id: string;
    descripcion: string;
    imagen: string;
    images: string[];
}

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    const [item, setItem] = useState<MuseoItem | null>(null);
    const router = useRouter();


    useEffect(() => {
        fetch(`${config.BASE_URL}/galeria/items.php`)
            .then(res => res.json())
            .then((data: MuseoItem[]) => {
                const fixed = data.map(i => ({
                    id: Number(i.id),
                    titulo: i.titulo,
                    descripcion: i.descripcion,
                    category_id: i.category_id,
                    imagen: i.imagen,
                    images: i.images
                }));

                const found = fixed.find(i => i.id === Number(id));
                setItem(found || null);
            });
    }, []);

    if (!item) return <Text>Cargando...</Text>;

    return (
        <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
            {Platform.OS === "web" ? <NavbarWeb /> : <NavMobil />}



            <ScrollView contentContainerStyle={styles.container}>
                {/* 🔙 BOTÓN VOLVER */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color="#333" />

                </TouchableOpacity>
                {/* 🟦 CARRUSEL DE IMÁGENES */}
                <View style={styles.swiperContainer}>
                    <Swiper
                        showsPagination={true}
                        autoplay={false}
                        dotColor="#bbb"
                        activeDotColor="#c47719"
                    >
                        {item.images?.map((img, idx) => (
                            <View key={idx}>
                                <Image
                                    source={{ uri: `${img}?v=${Date.now()}` }}
                                    style={styles.image}
                                />

                            </View>
                        ))}
                    </Swiper>
                </View>

                {/* 🟧 TÍTULO */}
                <Text style={styles.title}>{item.titulo}</Text>

                {/* 🟫 DESCRIPCIÓN */}
                <Text style={styles.description}>{item.descripcion}</Text>

                {/* 🟦 BOTÓN VER EN 3D */}
                <TouchableOpacity
                    style={styles.button3d}
                    onPress={() => {
                        if (item.id === 4) {
                            Linking.openURL("https://sketchfab.com/3d-models/olla-1bb2dbc099cd4462b7bee8cbcaf29051");
                        } else {
                            alert("Este objeto no tiene modelo 3D disponible.");
                        }
                    }}
                >
                    <Text style={styles.button3dText}>🧊 Ver en 3D</Text>
                </TouchableOpacity>

                {/* 🟥 BOTONES DE ACCIÓN */}
                <View style={styles.buttonsRow}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionText}>❤️ Me gusta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionText}>💬 Comentar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionText}>🔗 Compartir</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>

            {/* FOOTER / NAVBAR DE ABAJO */}
            <BottomNav onMenuPress={() => { }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 120,
        gap: 20,
    },

    swiperContainer: {
        height: 300,
        borderRadius: 12,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: 300,
        resizeMode: "cover",
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        marginTop: 10,
        color: "#222",
    },

    description: {
        fontSize: 17,
        color: "#444",
        lineHeight: 26,
        marginTop: 10,
        paddingBottom: 10,
    },

    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },

    actionBtn: {
        backgroundColor: "#eee",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginTop: -30
    },

    actionText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },
    button3d: {
        backgroundColor: "#c47719",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        marginTop: -10,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },

    button3dText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
    },
    backButton: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 50,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    backButtonText: {
        fontSize: 24,
        fontWeight: "900",
        color: "#333",
    },

});
