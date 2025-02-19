import { Stack } from "expo-router";
import "react-native-reanimated";

export default function MemoLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="view" options={{ headerShown: false }} />
      <Stack.Screen name="edit" options={{ headerShown: false }} />
      <Stack.Screen name="locationSetting" options={{ headerShown: false }} />
    </Stack>
  );
}
