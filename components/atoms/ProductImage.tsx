import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ProductImage({ uri }: { uri: string | null }) {
  const fallback = "https://via.placeholder.com/300x200?text=Sin+Imagen";

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: uri || fallback }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
