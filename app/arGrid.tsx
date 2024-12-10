import HomeSvg from "@/assets/images/home.svg";
import MemoListSvg from "@/assets/images/memoList.svg";
import { MAIN_PAGE, MEMO_LIST_PAGE } from "@/constants/Pages";
import { useBoundStore } from "@/store/useBoundStore";
import { ViroARScene, ViroARSceneNavigator, ViroFlexView } from "@reactvision/react-viro";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function ArGrid() {
  const setMemoLocation = useBoundStore((state) => state.setMemoLocation);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  function arGridScene() {
    return (
      <>
        <ViroARScene>
          <ViroFlexView
            position={[0, 0, -5]}
            scale={[1.7, 1.7, 0]}
            onClickState={handleClickGrid}
            style={{ backgroundColor: "#FFFF00", opacity: 0.5 }}
          />
        </ViroARScene>
      </>
    );
  }

  async function handleClickGrid() {
    setIsModalVisible(true);

    const { coords } = await Location.getCurrentPositionAsync({ accuracy: 6 });

    if (coords) {
      setMemoLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
      });
      setIsModalVisible(false);

      router.dismiss();
      router.push("/memoEdit");
    }
  }

  function handleMoveToHome() {
    router.dismiss();
    router.push("/loading");
  }

  return (
    <>
      <Modal visible={isModalVisible} transparent={true} animationType="none">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            위치 파악 중 . . . 🧭 {"\n"}
            잠시만 기다려주세요 ⏳
          </Text>
        </View>
      </Modal>

      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: arGridScene }}
        style={styles.arContainer}
        worldAlignment="Camera"
      />

      <View style={styles.bottomContainer}>
        <Pressable style={styles.iconContainer} onPress={handleMoveToHome}>
          <HomeSvg width="30%" height="30%" color="#343A40" />
          <Text style={styles.iconText}>{MAIN_PAGE}</Text>
        </Pressable>
        <View style={styles.blankContainer}></View>
        <Pressable style={styles.iconContainer}>
          <MemoListSvg width="30%" height="30%" color="#343A40" />
          <Text style={styles.iconText}>{MEMO_LIST_PAGE}</Text>
        </Pressable>
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
  blankContainer: {
    flex: 1,
  },
  modalContainer: {
    width: "80%",
    height: "15%",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowColor: "#343A40",
  },
  modalText: {
    fontSize: 25,
    color: "#343A40",
    textAlign: "center",
    lineHeight: 35,
  },
});
