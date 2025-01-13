import * as Font from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { setCustomText } from "react-native-global-props";
import "react-native-reanimated";

export default function RootLayout() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    async function getFont() {
      await Font.loadAsync({
        "SUITE-Light": require("@/assets/fonts/SUITE-Light.otf"),
        "SUITE-Regular": require("@/assets/fonts/SUITE-Regular.otf"),
        "SUITE-Medium": require("@/assets/fonts/SUITE-Medium.otf"),
        "SUITE-SemiBold": require("@/assets/fonts/SUITE-SemiBold.otf"),
        "SUITE-Bold": require("@/assets/fonts/SUITE-Bold.otf"),
      });

      setIsFontLoaded(true);
      setCustomText({
        style: {
          fontFamily: "SUITE-Regular, SUITE-Medium, SUITE-SemiBold, SUITE-Bold",
        },
      });
    }
    getFont();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
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
