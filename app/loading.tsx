import { getMemoList } from "@/firebase/memo";
import { useBoundStore } from "@/store/useBoundStore";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from "react-native";

export default function Loading() {
  const userId = useBoundStore((state) => state.userId);
  const setMemoList = useBoundStore((state) => state.setMemoList);
  const setUserLocation = useBoundStore((state) => state.setUserLocation);

  async function getUserMemoList() {
    const memoList = await getMemoList(userId);
    setMemoList(memoList || []);

    window.setTimeout(() => {
      router.dismiss();
      router.push("/arWebview");
    }, 1000);
  }

  async function getUserCurrentLocation(): Promise<void> {
    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      setUserLocation({
        latitude: Number(coords.latitude.toFixed(6)),
        longitude: Number(coords.longitude.toFixed(6)),
        altitude: Number(coords.altitude?.toFixed(6)) || 0,
      });
    }
  }

  useEffect(() => {
    getUserCurrentLocation();
    getUserMemoList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>사용자의 메모 목록을{"\n"}조회하고 있습니다.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 20,
    lineHeight: 30,
  },
});
