import React from "react";
import { StyleSheet, Text } from "react-native";

export default function ProductPrice({ price }: { price: number }) {
  const numericPrice= Number(price);

  return (
  <Text style={styles.price}>
    ${!isNaN(numericPrice) ? numericPrice.toFixed(2) : "0.00"}
    </Text>
  )
}

const styles = StyleSheet.create({
  price: {
    fontSize: 15,
    color: "#c47719",
    fontWeight: "600",
    marginTop: 4,
  },
});
