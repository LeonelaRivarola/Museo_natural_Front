import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

interface Props {
  text: string;
  style?: any;
  variant?: "default" | "label";
}

export default function TextTitle({ text, style, variant = "default" }: Props) {
  return (
    <Text
      style={[
        styles.title,
        variant === "label" && styles.label,
        style,
      ]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 24,
    ...(Platform.OS === "web" && { fontSize: 28 }),
  },
  label: {
    color: "#fff",
    backgroundColor: "#0055ff",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
});
