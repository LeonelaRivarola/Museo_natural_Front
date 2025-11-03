import React from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import BottomNavMobile from "../../components/organisms/BottomNavMobil";
import NavbarWeb from "../../components/organisms/Navbar";
import NavbarMobile from "../../components/organisms/NavMobil";
import ProductList from "../../components/organisms/ProductList";
import SideMenu from "../../components/organisms/SideMenu";

export default function StoreScreen() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "web" ? <NavbarWeb /> : <NavbarMobile />}
      {Platform.OS !== "web" && (
        <>
          <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
          <BottomNavMobile onMenuPress={() => setMenuVisible(true)} />
        </>
      )}

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
    marginTop: Platform.OS === "web" ? 100 : 0, // deja espacio para la navbar fija
  },

});
