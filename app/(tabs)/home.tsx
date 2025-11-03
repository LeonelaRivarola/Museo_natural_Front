import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavMobile from "../../components/organisms/BottomNavMobil";
import ImageCarousel from "../../components/organisms/ImagenCarousel";
import NavbarWeb from "../../components/organisms/Navbar";
import NavbarMobile from "../../components/organisms/NavMobil";
import SideMenu from "../../components/organisms/SideMenu";

export default function HomeScreen() {
  const windowHeight = Dimensions.get("window").height;
  const [menuVisible, setMenuVisible] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const buttonColor = useThemeColor({}, "tint");
  const backgroundImage = require("../../assets/images/portada_inicio.jpg");

  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      {/* 🔹 Web: Navbar fija arriba */}
      {Platform.OS === "web" && <NavbarWeb />}

      {/* 🔹 Mobile: Navbar arriba + menú lateral + barra inferior */}
      {Platform.OS !== "web" && (
        <>
          <NavbarMobile />
          <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
        </>
      )}

      {/* 🔹 Contenido principal */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[
            styles.heroContainer,
            { height: Platform.OS === "web" ? windowHeight * 0.8 : windowHeight * 0.6 },
          ]}
        >
          <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
            <View style={styles.overlay}>
              <Text style={styles.title}>Museo Natural</Text>
              <Text style={styles.subtitle}>Descubrí la historia y naturaleza</Text>

              {/* 🔹 Botón solo visible en MOBILE */}
              {Platform.OS !== "web" && (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: buttonColor }]}
                  onPress={() => router.push("/(tabs)/tienda")}

                >
                  <Text style={styles.buttonText}>Explorar</Text>
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        </View>

        <ImageCarousel />
      </ScrollView>

      {/* 🔹 Barra inferior solo en mobile */}
      {Platform.OS !== "web" && (
        <BottomNavMobile onMenuPress={() => setMenuVisible(true)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    overflow: "hidden",
    ...(Platform.OS === "web" && { minHeight: "50%" }),
  },
  background: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: Platform.OS === "web" ? 48 : 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: Platform.OS === "web" ? 22 : 18,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
