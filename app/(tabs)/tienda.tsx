import React from "react";
import { View, StyleSheet } from "react-native";
import TextTitle from "../../components/atoms/TextTitle";

const TiendaScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <TextTitle text="Bienvenido a la tienda" />
      {/* Agregar aquí componentes de la tienda en el futuro */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default TiendaScreen;
