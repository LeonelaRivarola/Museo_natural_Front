import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarWeb from "../../components/organisms/Navbar";
import NavbarMobile from "../../components/organisms/NavMobil";
import ProductList from "../../components/organisms/ProductList";


export default function StoreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "web" ? <NavbarWeb /> : <NavbarMobile />}

      <View style={styles.contentWrapper}>
        <ProductList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
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
});
