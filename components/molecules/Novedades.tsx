import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const novedades = [
  {
    titulo: "Visitas Educativas (mar-sep)",
    detalle: "Gran concurrencia de visitas educativas, en el Museo Provincial de Historia Natural",
    imagen: require("../../assets/images/novedad1.jpg"),
  },
  {
    titulo: "Colección: Aves",
    detalle: "Preparamos 4 ejemplares para conservación osteológica; se reasignaron 18 ejemplares; etiquetamos 11 ejemplares.",
    imagen: require("../../assets/images/novedad2.jpg"),
  },
  {
    titulo: "Gestión de proyectos: Transformación Digital",
    detalle: "Obtuvimos financiamiento para digitalizar colecciones y publicarlas en internet. Del proyecto participan diferentes Facultades de la UNLPam.",
    imagen: require("../../assets/images/novedad3.jpg"),
  },
];

export default function Novedades() {
  return (
    <View style={styles.container}>
      {novedades.map((item, i) => (
        <View key={i} style={styles.card}>
          <Image source={item.imagen} style={styles.image} resizeMode="cover" />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.titulo}</Text>
            <Text style={styles.detail}>{item.detalle}</Text>
          </View>
        </View>
      ))}

      {/* 🔹 Botón al final */}
      <TouchableOpacity style={styles.button} onPress={() => console.log("Ver todas las novedades")}>
        <Text style={styles.buttonText}>Ver todas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  textContainer: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },
  detail: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  button: {
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: "#c47719",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
