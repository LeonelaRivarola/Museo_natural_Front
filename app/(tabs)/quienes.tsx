import NavMobil from "@/components/organisms/NavMobil";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuienesScreen() {
  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const tint = useThemeColor({}, "tint");
  const separator = useThemeColor({}, "tabIconDefault");

  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
        <NavMobil />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Título principal */}
        <Text style={[styles.title, { color: text }]}>Museo de Historia Natural de La Pampa</Text>

        {/* Historia / descripción */}
        <Text style={[styles.paragraph, { color: text }]}>
          El Museo de Historia Natural de La Pampa (MHNLPam) es una institución fundada hace más de 80 años con la misión de exponer, difundir, investigar y conservar el Patrimonio Natural y Cultural de nuestra provincia. En colaboración con otros organismos desarrolla proyectos de investigación y programas educativos centrados en la conservación de la biodiversidad, puesta en valor de las áreas protegidas y el uso sustentable de los recursos naturales.
        </Text>

        <Text style={[styles.paragraph, { color: text }]}>
          Sus diez salas de exposición introducen al visitante en la rica biodiversidad de La Pampa y la relevancia de su patrimonio arqueológico y paleontológico. Asimismo, sus colecciones científicas resguardan más de 17 mil especímenes biológicos disponibles para consulta y estudio.
        </Text>

        <Text style={[styles.paragraph, { color: text }]}>
          El museo organiza regularmente conferencias, cursos y talleres destinados a estimular el intercambio de conocimientos entre el ámbito científico-técnico y distintos sectores de la comunidad.
        </Text>

        {/* Separador */}
        <View style={[styles.separator, { backgroundColor: separator }]} />

        {/* Información de contacto */}
        <View style={styles.infoBlock}>
          <Text style={[styles.subtitle, { color: tint }]}>Director</Text>
          <Text style={[styles.infoText, { color: text }]}>Ing. Daniel Pincen</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={[styles.subtitle, { color: tint }]}>Entrada</Text>
          <Text style={[styles.infoText, { color: text }]}>Libre y Gratuita</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={[styles.subtitle, { color: tint }]}>Atención</Text>
          <Text style={[styles.infoText, { color: text }]}>
            Lunes a Viernes: 8 a 13hs y 14 a 18hs{'\n'}
            Sábado y Domingo: 18 a 21hs
          </Text>
        </View>

        {/* Instagram / botón llamativo */}
        <TouchableOpacity
          style={[styles.button, { borderColor: tint }]}
          onPress={() => router.push("https://www.instagram.com/museohistorianaturallapampa")}
        >
          <Ionicons name="logo-instagram" size={20} color={tint} style={{ marginRight: 8 }} />
          <Text style={{ color: tint, fontWeight: "600" }}>Instagram @museohistorianaturallapampa</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 15,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
    textAlign: "justify",
  },
  separator: {
    height: 1,
    marginVertical: 20,
    width: "100%",
    alignSelf: "center",
  },
  infoBlock: {
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 22,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
});
