import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CarouselCard from "../molecules/CarouselCard";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "MIGRACIÓN",
    description:
      "Los seres humanos siempre se han desplazado de un lugar a otro. Descubre las historias de migrantes famosos y los viajes de personas comunes.",
    image: require("../../assets/images/gallery1.jpg"),
  },
  {
    title: "CULTURA",
    description:
      "Explora las expresiones culturales y tradiciones que conectan al ser humano con su entorno.",
    image: require("../../assets/images/gallery2.jpg"),
  },
  {
    title: "NATURALEZA",
    description:
      "Admira la belleza natural que nos rodea y aprende sobre la biodiversidad que debemos proteger.",
    image: require("../../assets/images/gallery3.jpg"),
  },
];

export default function ImageCarousel() {
  const scrollRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 Auto-scroll para ambas plataformas
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;

      if (Platform.OS === "web") {
        const carousel = scrollRef.current;
        if (carousel) {
          const cardWidth = carousel.scrollWidth / slides.length;
          carousel.scrollTo({
            left: nextIndex * cardWidth,
            behavior: "smooth",
          });
        }
      } else {
        scrollRef.current?.scrollTo({
          x: nextIndex * (width * 0.8 + 20),
          animated: true,
        });
      }

      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // 🔹 Control manual (clic en los indicadores)
  const handleIndicatorPress = (index: number) => {
    setCurrentIndex(index);

    if (Platform.OS === "web") {
      const carousel = scrollRef.current;
      if (carousel) {
        const cardWidth = carousel.scrollWidth / slides.length;
        carousel.scrollTo({
          left: index * cardWidth,
          behavior: "smooth",
        });
      }
    } else {
      scrollRef.current?.scrollTo({
        x: index * (width * 0.8 + 20),
        animated: true,
      });
    }
  };

  // 🔹 Web
  if (Platform.OS === "web") {
    return (
      <View style={styles.containerWeb}>
      <ScrollView
        horizontal
        ref={scrollRef}
        contentContainerStyle={{ flexDirection: "row", gap: 20 }}
      >
        {slides.map((slide, i) => (
          <View key={i} style={{ flex: 1 }}>
            <CarouselCard {...slide} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.indicators}>
        {slides.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleIndicatorPress(i)}
            style={[styles.dot, { opacity: currentIndex === i ? 1 : 0.4 }]}
          />
        ))}
      </View>
    </View>
  );
  }

  // 🔹 Mobile
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.8 + 20}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContainer}
      >
        {slides.map((slide, i) => (
          <View key={i} style={styles.cardWrapper}>
            <CarouselCard {...slide} />
          </View>
        ))}
      </ScrollView>

      {/* Indicadores */}
      <View style={styles.indicators}>
        {slides.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleIndicatorPress(i)}
            style={[
              styles.dot,
              { opacity: currentIndex === i ? 1 : 0.4 },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 320,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  cardWrapper: {
    width: width * 0.8,
    marginRight: 20,
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#c47719",
  },
  containerWeb: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },

  
});

const stylesWeb: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  carousel: {
    display: "flex",
    flexDirection: "row",
    overflowX: "hidden", // 👈 importante: sin error si está tipado correctamente
    gap: "20px",
    scrollSnapType: "x mandatory",
    width: "80%",
  },
  cardWrapper: {
    flex: "0 0 70%",
    scrollSnapAlign: "center",
  },
};
