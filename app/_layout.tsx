import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="loading" />
      <Stack.Screen name="ar" />
      <Stack.Screen name="arGrid" />
    </Stack>
  );
}
