import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CarouselCard from "../molecules/CarouselCard";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.90;
const SPACING = 10; // ← Spacing positivo

const slides = [
  {
    title: "MACACHIN",
    description: "Alumnos/as de 4to grado de la Escuela N°82.",
    image: require("../../assets/images/gallery1.jpg"),
  },
  {
    title: "GENERAL PICO",
    description: "participantes del Workshop Museos y Monumentos organizado por el IESH.",
    image: require("../../assets/images/gallery2.jpg"),
  },
  {
    title: "SANTA ROSA",
    description: "Sala de 4 años del JIN N°4 de la Escuela N°258.",
    image: require("../../assets/images/gallery3.jpg"),
  },
  {
    title: "SANTA ROSA",
    description: "estudiantes de la Cátedra Cultura y Comunicación de la carrera Comunicación Social (FCHs-UNLPam).",
    image: require("../../assets/images/gallery4.jpg"),
  },
];

export default function ImageCarousel(): React.ReactElement {
  const animatedX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentIndex + 1) % slides.length;
      const offset = next * (CARD_WIDTH + SPACING);
      scrollRef.current?.scrollTo({ x: offset, animated: true });
      setCurrentIndex(next);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleIndicatorPress = (i: number) => {
    const offset = i * (CARD_WIDTH + SPACING);
    scrollRef.current?.scrollTo({ x: offset, animated: true });
    setCurrentIndex(i);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: (width - CARD_WIDTH) / 2,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animatedX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => {
          const itemOffset = (CARD_WIDTH + SPACING) * index;

          const inputRange = [
            itemOffset - (CARD_WIDTH + SPACING),
            itemOffset,
            itemOffset + (CARD_WIDTH + SPACING),
          ];

          const scale = animatedX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp",
          });

          const rotateY = animatedX.interpolate({
            inputRange,
            outputRange: ["20deg", "0deg", "-20deg"],
            extrapolate: "clamp",
          });

          const opacity = animatedX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          const translateX = animatedX.interpolate({
            inputRange,
            outputRange: [40, 0, -40],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={{
                width: CARD_WIDTH,
                marginRight: SPACING,
                opacity,
                transform: [
                  { perspective: 800 },
                  { translateX },
                  { scale },
                  { rotateY },
                ],
              }}
            >
              <CarouselCard {...slide} />
            </Animated.View>
          );
        })}


      </Animated.ScrollView>

      <View style={styles.indicators}>
        {slides.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleIndicatorPress(i)}
            style={[
              styles.dot,
              { opacity: currentIndex === i ? 1 : 0.3 },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 280,
    marginVertical: 10,
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 1,
    gap: 8,
  },
  dot: {
    width: 20,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#c47719",
  },
});
