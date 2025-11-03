import React from "react";
import { StyleSheet, Text } from "react-native";

export default function ProductTitle({ title }: { title: string }) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
});
