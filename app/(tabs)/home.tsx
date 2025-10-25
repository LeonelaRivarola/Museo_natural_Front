import React from "react";
import {
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageCarousel from "../../components/organisms/ImagenCarousel";

export default function HomeScreen() {


  const windowHeight = Dimensions.get("window").height;

  const backgroundImage =
    Platform.OS === "web"
      ? require("../../assets/images/portada_inicio.jpg")
      : require("../../assets/images/portada_inicio.jpg");

  return (
    <ScrollView style={styles.container}>
      <View
        style={[
          styles.heroContainer,
          {
            height:
              Platform.OS === "web"
                ? windowHeight * 0.8
                : windowHeight * 0.6,
          },
        ]}
      >
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>Museo Natural</Text>
            <Text style={styles.subtitle}>
              Descubrí la historia y naturaleza
            </Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Explorar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <ImageCarousel />      
      {/* <GalleryList images={galleryImages} title="Galería Destacada" /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroContainer: {
    width: "100%",
    overflow: "hidden",
     ...(Platform.OS === "web" && {
    minHeight: "50%", // 🔹 asegura altura visible completa
  }),
  },
  background: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  height: "100%", // 🔹 importante para web
  },
  overlay: {
    flex: 1,
     width: "100%",
  height: "100%", // 🔹 garantiza que cubra todo
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
    backgroundColor: "#c47719ff",
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
