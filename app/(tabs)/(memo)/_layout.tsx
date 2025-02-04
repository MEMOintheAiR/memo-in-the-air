import { Stack } from "expo-router";

export default function LocationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="arWebview" />
      <Stack.Screen name="memoEdit" />
      <Stack.Screen name="setUserLocation" />
    </Stack>
  );
}
