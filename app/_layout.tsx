import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="loading" options={{ headerShown: false }} />
      <Stack.Screen
        name="ar"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="arGrid"
        options={{
          title: "메모 등록",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#343A40",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="memoEdit"
        options={{
          title: "메모 등록",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTitleStyle: {
            fontSize: 20,
            color: "#343A40",
          },
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
