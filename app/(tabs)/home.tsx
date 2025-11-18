import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import React from "react";
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
import ImageCarousel from "../../components/organisms/ImagenCarousel";
import NavbarWeb from "../../components/organisms/Navbar";
import NavbarMobile from "../../components/organisms/NavMobil";

export default function HomeScreen() {
  const windowHeight = Dimensions.get("window").height;

  const backgroundColor = useThemeColor({}, "background");
  const buttonColor = useThemeColor({}, "tint");
  const backgroundImage = require("../../assets/images/portada_inicio.jpg");

  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      {/* 🔹 Web: Navbar fija arriba */}
      {Platform.OS === "web" && <NavbarWeb active="/(tabs)/home" />}


      {/* 🔹 Mobile: Navbar arriba + menú lateral  */}
      {Platform.OS !== "web" && <NavbarMobile />}

      {/* 🔹 Contenido principal */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[
            styles.heroContainer,
            { height: Platform.OS === "web" ? windowHeight * 0.8 : windowHeight * 0.6 },
          ]}
        >
          <ImageBackground
            source={backgroundImage}
            style={styles.background}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              <View style={styles.overlayTint} /> 
              <View style={styles.textContainer}>
                <Text style={styles.title}>Museo Natural</Text>
                <Text style={styles.subtitle}>Descubrí la historia y naturaleza</Text>

                {Platform.OS !== "web" && (
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: buttonColor }]}
                    onPress={() => router.push("/(tabs)/tienda")}
                  >
                    <Text style={styles.buttonText}>Explorar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>


        <ImageCarousel />
      </ScrollView>

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
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  overlayTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(85, 48, 4, 0.35)", // tono naranja translúcido
    mixBlendMode: "multiply",
  },
  textContainer: {
    zIndex: 2,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: Platform.OS === "web" ? 56 : 38,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: Platform.OS === "web" ? 22 : 18,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
    opacity: 0.9,
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
