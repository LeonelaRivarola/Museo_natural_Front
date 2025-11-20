import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NavbarMobile({ onMenuPress }: { onMenuPress?: () => void }) {
  const insets = useSafeAreaInsets(); 

  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const shadow = useThemeColor({}, "tabIconDefault");
  const icon = useThemeColor({}, "icon");

  const styles = getStyles(bg, text, shadow);

    return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.left}>
        <Image
          source={require("../../assets/images/logo-sinfondo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Museo Natural</Text>
      </View>

      <View style={styles.right}>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={26} color={icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#fff",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     shadowColor: "#000",
// shadowOffset: { width: 0, height: 2 },
// shadowOpacity: 0.1,
// shadowRadius: 4,
// elevation: 3,

//   },
//   left: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   right: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   logo: {
//     width: 45,
//     height: 45,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#000",
//   },
// });

const getStyles = (bg: string, text: string, shadow: string) =>
  StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: bg,
      paddingHorizontal: 15,
      paddingVertical: 10,

      // 📌 Sombra adaptada a ambos temas
      shadowColor: shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    right: {
      flexDirection: "row",
      alignItems: "center",
    },
    logo: {
      width: 45,
      height: 45,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: text,
    },
  });