import React from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

interface GalleryItem {
  image: ImageSourcePropType;
  title: string;
}

interface GalleryListProps {
  title: string;
  images: GalleryItem[];
  seeAllRoute?: string; // opcional, para navegar a una pantalla completa
}

const GalleryList: React.FC<GalleryListProps> = ({
  title,
  images,
  seeAllRoute,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() => {
            if (seeAllRoute) router.push(seeAllRoute);
            else console.log("Ver todo");
          }}
        >
          <Text style={styles.viewAll}>Ver todo</Text>
        </TouchableOpacity>
      </View>

      {/* Listado horizontal */}
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => console.log("Imagen clickeada:", item.title)}
            activeOpacity={0.8}
          >
            <ImageBackground
              source={item.image}
              style={styles.image}
              imageStyle={{ borderRadius: 12 }}
            >
              <View style={styles.overlay}>
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default GalleryList;

const CARD_WIDTH = width * 0.6;
const CARD_HEIGHT = 200;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  viewAll: {
    fontSize: 16,
    color: "#c47719ff",
    fontWeight: "500",
  },
  card: {
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
