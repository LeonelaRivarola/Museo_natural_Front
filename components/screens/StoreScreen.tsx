import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarWeb from "../../components/organisms/Navbar";
import NavbarMobile from "../../components/organisms/NavMobil";
import ProductList from "../../components/organisms/ProductList";

export default function StoreScreen() {

  // 🎨 Colores desde el theme
  const background = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const border = useThemeColor({}, "tabIconDefault");

  const styles = getStyles(background, text, border);

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "web" ? <NavbarWeb /> : <NavbarMobile />}

      <View style={styles.contentWrapper}>
        {/* Intro de la tienda */}
        <View style={styles.intro}>
  <Text style={styles.title}>Bienvenido a la Tienda</Text>
  <Text style={styles.description}>
    Explora nuestros productos y recuerdos del museo.
  </Text>
</View>


        {/* Lista de productos */}
        <ProductList />
      </View>
    </SafeAreaView>
  );
}

/* ------------------ THEMED STYLES ------------------ */
const getStyles = (background: string, text: string, border: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
    },

    contentWrapper: {
      flex: 1,
      width: "100%",
      maxWidth: 1200,
      alignSelf: "center",
      paddingVertical: 30,
      paddingHorizontal: 15,
      marginTop: Platform.OS === "web" ? 100 : 0,
    },

    intro: {
  marginBottom: 25,
  paddingHorizontal: 10,
  paddingVertical: 5,
},

title: {
  fontSize: 28,
  fontWeight: "800",
  color: text,
  marginBottom: 5,
  textAlign: "center",
},

description: {
  fontSize: 16,
  color: text,
  textAlign: "center",
  lineHeight: 22,
  opacity: 0.85,
},

  });
