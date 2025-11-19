import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProductImage from "../atoms/ProductImage";
import ProductPrice from "../atoms/ProductPrice";
import ProductTitle from "../atoms/ProductTitle";

export default function ProductCard({ item, isAdmin = false, onEdit, onDelete }: any) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      {/* Imagen */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push(`/product/${item.id_producto}`)}

      >
        <ProductImage uri={item.imagen} />
      </TouchableOpacity>


      {/* Contenido */}
      <View style={styles.content}>
        <ProductTitle title={item.nombre} />
        <ProductPrice price={item.precio} />
      </View>

      {/* Botones */}
      {isAdmin ? (
        <View style={styles.adminButtons}>
          <TouchableOpacity style={styles.adminBtn} onPress={onEdit}>
            <Ionicons name="create-outline" size={20} color="#c47719" />
            <Text style={styles.adminText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.adminBtn} onPress={onDelete}>
            <Ionicons name="trash-outline" size={20} color="red" />
            <Text style={[styles.adminText, { color: "red" }]}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => router.push(`/product/${item.id_producto}`)}
        >
          <Text style={styles.viewText}>Ver más</Text>
        </TouchableOpacity>

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "50%",
    height: 270,
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    padding: 12,
    flexGrow: 1,
    justifyContent: "flex-start"
  },
  viewButton: {
    backgroundColor: "#c47719",
    paddingVertical: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
  },
  viewText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  adminButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  adminBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  adminText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#444",
  },
});
