import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ headerShown: false }} />
      <Stack.Screen name="memoEdit" options={{ headerShown: false }} />
      <Stack.Screen name="memoMap" options={{ headerShown: false }} />
      <Stack.Screen
        name="arWebview"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerBackVisible: false,
        }}
      />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      <Stack.Screen name="locationPermission" options={{ headerShown: false }} />
      <Stack.Screen name="setUserLocation" options={{ headerShown: false }} />
    </Stack>
  );
}
