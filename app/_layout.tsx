import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Ruta raíz (app/index.js) */}
      <Stack.Screen name="index" />

      {/* Grupo de pestañas (app/(tabs)/_layout.js) */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
