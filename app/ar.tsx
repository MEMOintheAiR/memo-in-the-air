import HomeSvg from "../assets/images/home.svg";
import MemoListSvg from "../assets/images/memoList.svg";
import PlusSvg from "../assets/images/plus.svg";
import { MAIN_PAGE, MEMO_LIST_PAGE } from "@/constants/Pages";
import { ViroARScene, ViroARSceneNavigator } from "@reactvision/react-viro";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ar() {
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
