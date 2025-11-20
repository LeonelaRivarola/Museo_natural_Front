import HorarioCard from "@/components/molecules/HorarioCard";
import RegisterBanner from "@/components/molecules/RegisterBanner";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Novedades from "../../components/molecules/Novedades";
import VisitBanner from "../../components/molecules/VisitaBanner";
import ImageCarousel from "../../components/organisms/ImagenCarousel";
import NavbarWeb from "../../components/organisms/Navbar";
import NavbarMobile from "../../components/organisms/NavMobil";


export default function HomeScreen() {
  const windowHeight = Dimensions.get("window").height;

  const backgroundColor = useThemeColor({}, "background");
  const backgroundImage = require("../../assets/images/portada_inicio.jpg");

  const router = useRouter();

  // modos
  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const separador = useThemeColor({}, "tabIconDefault");
  const circleBorder = useThemeColor({}, "tint");

  const styles = getStyles(text, separador, circleBorder);
  const categorias = [
    { titulo: "Arqueología", icon: require("../../assets/icons/arqueologia.png"), ruta: "/arqueologia" },
    { titulo: "Herbarios", icon: require("../../assets/icons/herbario.png"), ruta: "/herbarios" },
    { titulo: "Zoología", icon: require("../../assets/icons/zoologia.png"), ruta: "/zoologia" },
    { titulo: "Paleontología", icon: require("../../assets/icons/paleo.png"), ruta: "/paleo" },
  ] as const;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      {Platform.OS === "web" && <NavbarWeb active="/(tabs)/home" />}
      {Platform.OS !== "web" && <NavbarMobile />}

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
                <Text style={styles.title}>¡Bienvenidos/as!</Text>
                <Text style={styles.subtitle}>Descubrí la historia y naturaleza</Text>
              </View>

              {/* 🔹 Círculos de categorías */}
              {Platform.OS === "web" ? (
                <View style={styles.categoriasContainerWeb}>
                  {categorias.map((item, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.categoria}
                      onPress={() =>
                        router.push({
                          pathname: "/galeria",
                          params: { categoria: item.titulo }
                        })
                      }
                    >
                      <View style={styles.circulo}>
                        <Image source={item.icon} style={styles.icono} />
                      </View>
                      <Text style={styles.categoriaTexto}>{item.titulo}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoriasContainerMobile}
                >
                  {categorias.map((item, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.categoria}
                      onPress={() =>
                        router.push({
                          pathname: "/galeria",
                          params: { categoria: item.titulo }
                        })
                      }
                    >
                      <View style={styles.circulo}>
                        <Image source={item.icon} style={styles.icono} />
                      </View>
                      <Text style={styles.categoriaTexto}>{item.titulo}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

          </ImageBackground>
        </View>
        <View style={styles.separator} />

        <HorarioCard />

        <View style={styles.separator} />

        {/* 🔹 Sección “¿Quiénes somos?” */}
        <View style={{ paddingHorizontal: 20, marginTop: 10, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "800",
              color: text,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            ¿Quiénes somos?
          </Text>

          <Text
            style={{
              fontSize: 16,
              lineHeight: 22,
              color: text,
              opacity: 0.85,
              textAlign: "justify",
            }}
          >
            El Museo de Historia Natural de La Pampa (MHNLPam) trabaja desde hace más de
            80 años investigando, conservando y difundiendo el patrimonio natural y
            cultural de la provincia. A través de sus salas y programas educativos, el
            museo invita a conocer la biodiversidad pampeana, su riqueza arqueológica y
            paleontológica, y la importancia de nuestras áreas protegidas.
          </Text>

          {/* Botón para ir a la sección completa */}
          <TouchableOpacity
            style={{
              marginTop: 15,
              alignSelf: "center",
              paddingVertical: 8,
              paddingHorizontal: 20,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: separador,
            }}
            onPress={() => router.push("/quienes")}
          >
            <Text style={{ color: text, fontSize: 14, fontWeight: "600" }}>
              Leer más
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.miniTitulos}>Vení a visitarnos</Text>

        <ImageCarousel />

        <VisitBanner />

        <View style={styles.separator} />

        <Text style={styles.miniTitulos}>Novedades</Text>
        <Novedades />

        <View style={styles.separator} />
        <View style={{ height: 20 }} />

        <RegisterBanner />
      </ScrollView>

    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   miniTitulos: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: text,
//     marginTop: 10,
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   separator: {
//     height: 1,
//     backgroundColor: separador,
//     marginVertical: 8,
//     marginHorizontal: 20
//   },
//   heroContainer: {
//     width: "100%",
//     overflow: "hidden",
//     ...(Platform.OS === "web" && { minHeight: "50%" }),
//     marginBottom: 20
//   },
//   background: {
//     flex: 1,
//     justifyContent: "center",
//     width: "100%",
//     height: "100%",
//   },
//   overlay: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//   },
//   overlayTint: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: Platform.OS === "web" ? "rgba(0, 0, 0, 0.55)" : "rgba(0, 0, 0, 0.4)",
//     mixBlendMode: "multiply",
//   },
//   textContainer: {
//     zIndex: 2,
//     alignItems: "center",
//     paddingHorizontal: 20,
//     marginTop: "10%",
//   },
//   title: {
//     fontSize: Platform.OS === "web" ? 56 : 38,
//     fontWeight: "800",
//     color: "#fff",
//     letterSpacing: 1,
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: Platform.OS === "web" ? 22 : 18,
//     color: "#fff",
//     marginBottom: 30,
//     textAlign: "center",
//     opacity: 0.9,
//   },
//   button: {
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 25,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },

//   categoriasContainerWeb: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     marginTop: 30,
//     gap: 80,
//   },

//   categoriasContainerMobile: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "flex-end",
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//   },

//   categoria: {
//     justifyContent: "center",
//     alignItems: "center",
//     // width:  150,
//     // marginBottom: 20,
//     marginHorizontal: 10,
//   },

//   circulo: {
//     width: Platform.OS === "web" ? 120 : 70,
//     height: Platform.OS === "web" ? 120 : 70,
//     borderRadius: Platform.OS === "web" ? 70 : 35,
//     borderWidth: 2,
//     borderColor: circleBorder,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 8,
//   },

//   icono: {
//     width: Platform.OS === "web" ? 75 : 50,
//     height: Platform.OS === "web" ? 75 : 50,
//     tintColor: text,
//   },

//   categoriaTexto: {
//     color: text,
//     fontSize: 14,
//     fontWeight: "600",
//     textAlign: "center",
//   },
// });
const getStyles = (text: string, separator: string, circleBorder: string) =>
  StyleSheet.create({
    miniTitulos: {
      fontSize: 24,
      fontWeight: "800",
      color: text,
      marginTop: 10,
      marginBottom: 10,
      textAlign: "center",
    },

    separator: {
      height: 1,
      backgroundColor: separator + "8",
      marginVertical: 8,
      marginHorizontal: 20,
    },

    heroContainer: {
      width: "100%",
      overflow: "hidden",
      ...(Platform.OS === "web" && { minHeight: "50%" }),
      marginBottom: 20,
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
      backgroundColor:
        Platform.OS === "web"
          ? "rgba(0, 0, 0, 0.55)"
          : "rgba(0, 0, 0, 0.4)",
      mixBlendMode: "multiply",
    },

    textContainer: {
      zIndex: 2,
      alignItems: "center",
      paddingHorizontal: 20,
      marginTop: "10%",
    },

    title: {
      fontSize: Platform.OS === "web" ? 56 : 38,
      fontWeight: "800",
      color: "#fff",
      letterSpacing: 1,
      marginBottom: 10,
      textAlign: "center",
    },

    subtitle: {
      fontSize: Platform.OS === "web" ? 22 : 18,
      color: "#fff",
      marginBottom: 30,
      textAlign: "center",
      opacity: 0.9,
    },

    categoriasContainerWeb: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 30,
      gap: 80,
    },

    categoriasContainerMobile: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-end",
      paddingHorizontal: 20,
      paddingBottom: 10,
    },

    categoria: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,
    },

    circulo: {
      width: Platform.OS === "web" ? 120 : 70,
      height: Platform.OS === "web" ? 120 : 70,
      borderRadius: Platform.OS === "web" ? 70 : 35,
      borderWidth: 2,
      borderColor: circleBorder,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },

    icono: {
      width: Platform.OS === "web" ? 75 : 50,
      height: Platform.OS === "web" ? 75 : 50,
      tintColor: "#fff",
    },

    categoriaTexto: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
      textAlign: "center",
    },
  });
