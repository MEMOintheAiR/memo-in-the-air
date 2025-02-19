import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signIn" options={{ headerShown: false }} />
      <Stack.Screen name="locationPermission" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}
