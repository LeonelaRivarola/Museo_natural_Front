import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export default function Overlay({ style }: { style?: ViewStyle }) {
  return <View style={[styles.overlay, style]} />;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});
