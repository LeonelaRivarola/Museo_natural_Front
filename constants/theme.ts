import { Platform } from "react-native";

const tintColorLight = "#c47719";
const tintColorDark = "#c47719";

export const Colors = {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    navbarBackground: tintColorLight, // naranja
    navbarText: "#fff", // texto blanco en el navbar
    buttonText: "#fff",
    icon: "#555",
    tabIconDefault: "#777",
    tabIconSelected: tintColorLight,
     card: "#ffffff",
    cardBorder: "#ddd",
    chipBg: "#e0e0e0",
    chipActiveBg: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#151718",
    tint: tintColorDark,
    navbarBackground: tintColorDark,
    navbarText: "#fff", // sigue blanco en modo oscuro
    buttonText: "#fff",
    icon: "#d3d3d3ff",
    tabIconDefault: "#aaa",
    tabIconSelected: tintColorDark,
     card: "#1e1f20",
    cardBorder: "#333",
    chipBg: "#2a2a2a",
    chipActiveBg: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
