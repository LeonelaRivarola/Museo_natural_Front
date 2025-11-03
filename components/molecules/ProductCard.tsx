// components/molecules/ProductCard.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProductImage from "../atoms/ProductImage";
import ProductPrice from "../atoms/ProductPrice";
import ProductTitle from "../atoms/ProductTitle";

interface Props {
  item: any;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProductCard({ item, isAdmin = false, onEdit, onDelete }: Props) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          !isAdmin &&
          router.push({
            pathname: "/product/[id]",
            params: { id: item.id_producto },
          })
        }
      >
        <ProductImage uri={item.imagen || "https://via.placeholder.com/300"} />
        <View style={styles.content}>
          <ProductTitle title={item.nombre} />
          <ProductPrice price={item.precio} />
        </View>
      </TouchableOpacity>

      {isAdmin ? (
        <View style={styles.adminButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={onEdit}>
            <Ionicons name="create-outline" size={22} color="#c47719" />
            <Text style={styles.iconLabel}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onDelete}>
            <Ionicons name="trash-outline" size={22} color="red" />
            <Text style={[styles.iconLabel, { color: "red" }]}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() =>
            router.push({
              pathname: "/product/[id]",
              params: { id: item.id_producto },
            })
          }
        >
          <Text style={styles.viewText}>Ver más</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 10,
  },
  adminButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  iconButton: {
    alignItems: "center",
  },
  iconLabel: {
    fontSize: 12,
    color: "#555",
    marginTop: 3,
  },
  viewButton: {
    backgroundColor: "#c47719",
    paddingVertical: 8,
    alignItems: "center",
  },
  viewText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
