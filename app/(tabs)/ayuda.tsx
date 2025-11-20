import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavbarWeb from "../../components/organisms/Navbar";
import NavMobil from "../../components/organisms/NavMobil";

export default function AyudaScreen() {
  // 🎨 Colores
  const background = useThemeColor({}, "background");
  const cardBg = useThemeColor({}, "card");
  const text = useThemeColor({}, "text");
  const subtitle = useThemeColor({}, "tabIconDefault");

  // 🔧 Estado para el menú móvil (evita el error)
  const [menuVisible, setMenuVisible] = React.useState(false);

  const styles = getStyles(background, cardBg, text, subtitle);

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "web" ? <NavbarWeb /> : <NavMobil />}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Centro de Ayuda</Text>

          <Text style={styles.subtitle}>
            Encontrá información útil y respuestas a las consultas más frecuentes.
          </Text>

          {/* FAQ */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>

            <View style={styles.faqItem}>
              <Text style={styles.faqQ}>📦 ¿Cómo puedo realizar una compra?</Text>
              <Text style={styles.faqA}>
                Ingresá a la Tienda, elegí un producto y tocá “Ver más”.
              </Text>
            </View>

            <View style={styles.faqItem}>
              <Text style={styles.faqQ}>💳 ¿Qué métodos de pago existen?</Text>
              <Text style={styles.faqA}>Encontrarás la información en cada producto.</Text>
            </View>

            <View style={styles.faqItem}>
              <Text style={styles.faqQ}>🐆 ¿Cómo puedo comunicarme con el Museo?</Text>
              <Text style={styles.faqA}>
                Podés enviarnos un correo o llamarnos. Datos abajo.
              </Text>
            </View>
          </View>

          {/* CONTACTO */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contacto</Text>

            <Text style={styles.contactLine}>
              📧 museodehistorianatural@lapampa.gob.ar
            </Text>
            <Text style={styles.contactLine}>📞 +54 (02954) 42-2693</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 🛠 Tipamos la función correctamente para evitar error 7006
const getStyles = (
  bg: string,
  cardBg: string,
  text: string,
  subtitle: string
) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: bg },

    scrollContent: {
      padding: 16,
      paddingBottom: 90,
    },

    card: {
      backgroundColor: cardBg,
      padding: 20,
      borderRadius: 12,
      elevation: 1,
    },

    title: {
      fontSize: 26,
      fontWeight: "700",
      color: text,
      marginBottom: 8,
    },

    subtitle: {
      fontSize: 14,
      color: subtitle,
      marginBottom: 24,
    },

    section: {
      marginBottom: 24,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: text,
      marginBottom: 12,
    },

    faqItem: {
      marginBottom: 16,
    },

    faqQ: {
      fontSize: 15,
      color: text,
      fontWeight: "600",
    },

    faqA: {
      fontSize: 14,
      color: subtitle,
      marginTop: 4,
      lineHeight: 18,
    },

    contactLine: {
      fontSize: 14,
      color: text,
      marginBottom: 6,
    },
  });
