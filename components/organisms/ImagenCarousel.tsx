import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import CarouselCard from "../molecules/CarouselCard";

const { width } = Dimensions.get("window");

// SOLO ANDROID — coverflow style
const CARD_WIDTH = width * 0.78;
const SPACING = -60; // 🔥 Superposición real

const slides = [
  {
    title: "MIGRACIÓN",
    description: "Los seres humanos siempre se han desplazado.",
    image: require("../../assets/images/gallery1.jpg"),
  },
  {
    title: "CULTURA",
    description: "Explora expresiones culturales y tradiciones.",
    image: require("../../assets/images/gallery2.jpg"),
  },
  {
    title: "NATURALEZA",
    description: "Admira la belleza natural y biodiversidad.",
    image: require("../../assets/images/gallery3.jpg"),
  },
];

export default function ImageCarousel(): React.ReactElement {
  const animatedX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // AUTO SCROLL
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      const offset = nextIndex * (CARD_WIDTH + SPACING);

      scrollRef.current?.scrollTo({
        x: offset,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleIndicatorPress = (index: number) => {
    const offset = index * (CARD_WIDTH + SPACING);
    setCurrentIndex(index);
    scrollRef.current?.scrollTo({ x: offset, animated: true });
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

          // ESCALA — centro grande, laterales chicos
          const scale = animatedX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: "clamp",
          });

          const translateX = animatedX.interpolate({
            inputRange,
            outputRange: [-25, 0, 25],
            extrapolate: "clamp",
          });
          // NUEVO: inclinación suave hacia adentro
          const rotateY = animatedX.interpolate({
            inputRange,
            outputRange: ["15deg", "0deg", "-15deg"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={{
                width: CARD_WIDTH,
                marginRight: SPACING,
                transform: [
                  { perspective: 600 },
                  { translateX },
                  { rotateY },
                  { scale },
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
    height: 360,
    marginVertical: 40,
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
});
