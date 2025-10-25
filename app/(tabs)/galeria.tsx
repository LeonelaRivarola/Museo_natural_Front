import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import GalleryList from "../../components/molecules/GalleryList";

const GaleriaScreen: React.FC = () => {
  const data = [
    {
      image: require("../../assets/images/gallery1.jpg"),
      title: "Evento Cultural",
    },
    {
      image: require("../../assets/images/gallery2.jpg"),
      title: "Exposición de Arte",
    },
    {
      image: require("../../assets/images/gallery3.jpg"),
      title: "Taller de Cerámica",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <GalleryList title="Galería de Imágenes" images={data} seeAllRoute="/(tabs)/galeria" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});

export default GaleriaScreen;
