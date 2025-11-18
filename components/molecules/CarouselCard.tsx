import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import TextParagraph from "../atoms/TextParagraph";
import TextTitle from "../atoms/TextTitle";

interface CarouselCardProps {
  title: string;
  description: string;
  image: any;
}

export default function CarouselCard({ title, description, image }: CarouselCardProps) {
  return (
    <View style={styles.card}>
      <ImageBackground source={image} style={styles.image}>
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "transparent"]}
          style={styles.gradient}
        />

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
    // width: "100%",
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    // justifyContent: "flex-end",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  description: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    lineHeight: 18,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 15,
  },
});
