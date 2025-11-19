import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function QrInfo() {
  const { qr } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado del QR</Text>
      <Text style={styles.content}>{qr}</Text>

      <Text style={styles.description}>
        Aquí podés mostrar la información de la colección asociada,
        como descripción, historia, fotos, etc.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 30, fontWeight: "800", marginBottom: 20 },
  content: { fontSize: 22, color: "#333", marginBottom: 12 },
  description: { fontSize: 16, color: "gray" },
});
