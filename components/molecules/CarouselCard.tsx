import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import TextTitle from "../atoms/TextTitle";
import TextParagraph from "../atoms/TextParagraph";
import Overlay from "../atoms/Overlay";

interface CarouselCardProps {
  title: string;
  description: string;
  image: any;
}

export default function CarouselCard({ title, description, image }: CarouselCardProps) {
  return (
    <View style={styles.card}>
      <ImageBackground source={image} style={styles.image}>
        <Overlay />
        <View style={styles.content}>
          <TextTitle text={title} variant="label" />
          <TextParagraph text={description} style={styles.description} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#000",
    marginTop: 50,
    marginBottom: 50
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    padding: 20,
  },
  description: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    lineHeight: 18,
  },
});
