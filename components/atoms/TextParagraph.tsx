import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

export default function TextParagraph({ text, style }: { text: string; style?: TextStyle }) {
  return <Text style={[styles.paragraph, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  paragraph: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 18,
  },
});
