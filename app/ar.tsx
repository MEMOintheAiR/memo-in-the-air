import HomeSvg from "@/assets/images/home.svg";
import MemoListSvg from "@/assets/images/memoList.svg";
import PlusSvg from "@/assets/images/plus.svg";
import { MAIN_PAGE, MEMO_LIST_PAGE } from "@/constants/Pages";
import { getUserMemoList } from "@/firebase/memo";
import { useBoundStore } from "@/store/useBoundStore";
import { ViroARScene, ViroARSceneNavigator } from "@reactvision/react-viro";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AR() {
  const userId = useBoundStore((state) => state.userId);
  const setUserLocation = useBoundStore((state) => state.setUserLocation);

  const [memoList, setMemoList] = useState<Array<object[]>>([]);

  function arScene() {
    return <ViroARScene />;
  }

  function handleMoveToHome() {
    router.dismiss();
    router.push("/home");
  }

  function handleMoveToARGrid() {
    router.dismiss();
    router.push("/loading");
  }

  async function getUserLocation() {
    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
      });
    }
  }

  async function getUserMemoListFB(userId: string) {
    const memoList = await getUserMemoList(userId);
    setMemoList(memoList);
  }

  useEffect(() => {
    getUserLocation();
    getUserMemoListFB(userId);
  }, []);

  return (
    <>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: arScene }}
        style={styles.arContainer}
        worldAlignment="Camera"
      />

      <View style={styles.bottomContainer}>
        <Pressable style={styles.iconContainer} onPress={handleMoveToHome}>
          <HomeSvg width="30%" height="30%" color="#343A40" />
          <Text style={styles.iconText}>{MAIN_PAGE}</Text>
        </Pressable>
        <Pressable style={styles.plusIconContainer} onPress={handleMoveToARGrid}>
          <PlusSvg width="65%" height="65%" color="#6CA0DC" />
        </Pressable>
        <View style={styles.iconContainer}>
          <MemoListSvg width="30%" height="30%" color="#343A40" />
          <Text style={styles.iconText}>{MEMO_LIST_PAGE}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  arContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 0.15,
    flexDirection: "row",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  iconText: {
    fontSize: 15,
    marginTop: 8,
    color: "#343A40",
  },
  plusIconContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 3,
  },
});
