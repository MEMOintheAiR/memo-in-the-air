import Home from "./home";
import { useBoundStore } from "@/store/useBoundStore";
import { checkUserId } from "@/utils/uuid";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const setUserId = useBoundStore((state) => state.setUserId);

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

  useEffect(() => {
    checkLocationPermission();

    const userId: Promise<string> = checkUserId();
    setUserId(userId);
  }, []);

  return <Home />;
}
