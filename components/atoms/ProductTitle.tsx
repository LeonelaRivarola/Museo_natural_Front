import React from "react";
import { StyleSheet, Text } from "react-native";

export default function ProductTitle({ title }: { title: string }) {
  return <Text style={styles.title} numberOfLines={2}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 3
  },
});
