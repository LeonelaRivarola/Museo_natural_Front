import React from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from "react-native";

interface GalleryItemProps {
  image: ImageSourcePropType;
  onPress: () => void;
}

const { width } = Dimensions.get("window");

const GalleryItem: React.FC<GalleryItemProps> = ({ image, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={image} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  );
};

export default GalleryItem;

const styles = StyleSheet.create({
  item: {
    marginRight: 10,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  image: {
    width: width * 0.4,
    height: width * 0.25,
  },
});
