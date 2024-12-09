import { CREATE_MEMO_PAGE } from "@/constants/Pages";
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
          title: CREATE_MEMO_PAGE,
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
      <Stack.Screen name="memoEdit" options={{ headerShown: false }} />
    </Stack>
  );
}
