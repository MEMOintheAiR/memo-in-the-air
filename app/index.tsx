import Home from "./home";
import { useBoundStore } from "@/store/useBoundStore";
import { checkUserId } from "@/utils/uuid";
import * as Font from "expo-font";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { setCustomText } from "react-native-global-props";

export default function Index() {
  const setUserId = useBoundStore((state) => state.setUserId);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  async function checkLocationPermission() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        router.replace("/locationPermission");
      }
    } catch {
      router.replace("/locationPermission");
    }
  }

  async function getFont() {
    await Font.loadAsync({
      "SUITE-Light": require("@/assets/fonts/SUITE-Light.otf"),
      "SUITE-Regular": require("@/assets/fonts/SUITE-Regular.otf"),
      "SUITE-Medium": require("@/assets/fonts/SUITE-Medium.otf"),
      "SUITE-SemiBold": require("@/assets/fonts/SUITE-SemiBold.otf"),
      "SUITE-Bold": require("@/assets/fonts/SUITE-Bold.otf"),
      "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
    });

    setIsFontLoaded(true);
    setCustomText({
      style: {
        fontFamily: "SUITE-Regular, SUITE-Medium, SUITE-SemiBold, SUITE-Bold, Roboto-Medium",
      },
    });
  }

  useEffect(() => {
    checkLocationPermission();
    getFont();

    const userId: Promise<string> = checkUserId();
    setUserId(userId);
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return <Home />;
}
