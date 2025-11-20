import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
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
import Swiper from "react-native-swiper";
import config from "../config/config";

import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../../components/organisms/BottomNavMobil";
import NavbarWeb from "../../components/organisms/Navbar";
import NavMobil from "../../components/organisms/NavMobil";

import { useThemeColor } from "@/hooks/use-theme-color";

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

    // THEME COLORS
    const background = useThemeColor({}, "background");
    const text = useThemeColor({}, "text");
    const border = useThemeColor({}, "tabIconDefault");
    const tint = useThemeColor({}, "tint");
    const card = useThemeColor({}, "card");
    const iconColor = useThemeColor({}, "icon");

    const styles = getStyles(background, text, border, tint, card, iconColor);

    useEffect(() => {
        fetch(`${config.BASE_URL}/galeria/items.php`)
            .then((res) => res.json())
            .then((data: MuseoItem[]) => {
                const fixed = data.map((i) => ({
                    id: Number(i.id),
                    titulo: i.titulo,
                    descripcion: i.descripcion,
                    category_id: i.category_id,
                    imagen: i.imagen,
                    images: i.images,
                }));

                const found = fixed.find((i) => i.id === Number(id));
                setItem(found || null);
            });
    }, []);

    if (!item) return <Text style={{ color: text }}>Cargando...</Text>;

    return (
        <View style={[styles.screen]}>
            {Platform.OS === "web" ? <NavbarWeb /> : <NavMobil />}

            <ScrollView contentContainerStyle={styles.container}>
                {/* back */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color={iconColor} />
                </TouchableOpacity>

                {/* Imagenes */}
                <View style={styles.swiperContainer}>
                    <Swiper
                        showsPagination={true}
                        autoplay={false}
                        dotColor={border}
                        activeDotColor={tint}
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

                
                <Text style={styles.title}>{item.titulo}</Text>
                <Text style={styles.description}>{item.descripcion}</Text>

                {/* boton 3D */}
                <TouchableOpacity
                    style={styles.button3d}
                    onPress={() => {
                        if (item.id === 4) {
                            Linking.openURL(
                                "https://sketchfab.com/3d-models/olla-1bb2dbc099cd4462b7bee8cbcaf29051"
                            );
                        } else {
                            alert("Este objeto no tiene modelo 3D disponible.");
                        }
                    }}
                >
                    <Text style={styles.button3dText}>🧊 Ver en 3D</Text>
                </TouchableOpacity>

                {/* ACCIONES */}
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

            <BottomNav onMenuPress={() => { }} />
        </View>
    );
}

/* ------------------ DYNAMIC THEMED STYLES ------------------ */

const getStyles = (
    background: string,
    text: string,
    border: string,
    tint: string,
    card: string,
    iconColor: string
) =>
    StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: background,
        },

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
            color: text,
        },

        description: {
            fontSize: 17,
            color: text,
            opacity: 0.8,
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
            backgroundColor: card,
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: border,
            marginTop: -30,
        },

        actionText: {
            fontSize: 15,
            fontWeight: "600",
            color: text,
        },

        button3d: {
            backgroundColor: tint,
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: "center",
            marginTop: -10,
            elevation: 3,
        },

        button3dText: {
            color: "#fff",
            fontSize: 18,
            fontWeight: "700",
        },

        backButton: {
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 50,
            backgroundColor: card,
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: border,
            elevation: 5,
        },
    });
