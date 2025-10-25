import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  label: string;
  onPress?: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  highlight?: boolean; // para resaltar botones como "Iniciar sesión"
}

export default function MenuItem({ label, onPress, iconName, highlight }: Props) {
  return (
    <TouchableOpacity
      style={[styles.item, highlight && styles.highlightItem]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {iconName && <Ionicons name={iconName} size={24} color={highlight ? "#fff" : "#333"} style={styles.icon} />}
        <Text style={[styles.label, highlight && styles.highlightLabel]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    backgroundColor: "#f0f0f0",
  },
  highlightItem: {
    backgroundColor: "#c47719ff",
  },
  content: { flexDirection: "row", alignItems: "center" },
  icon: { marginRight: 12 },
  label: { fontSize: 18, color: "#333" },
  highlightLabel: { color: "#fff", fontWeight: "bold" },
});
