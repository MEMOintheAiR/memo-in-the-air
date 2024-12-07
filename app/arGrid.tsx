import HomeSvg from "../assets/images/home.svg";
import MemoListSvg from "../assets/images/memoList.svg";
import PlusSvg from "../assets/images/plus.svg";
import { MAIN_PAGE, MEMO_LIST_PAGE } from "@/constants/Pages";
import { ViroARScene, ViroARSceneNavigator, ViroQuad } from "@reactvision/react-viro";
import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function arGrid() {
  function arGridScene() {
    return (
      <ViroARScene>
        <ViroQuad position={[0, 0, -5]} height={1.5} width={1.5} opacity={0.5} />
      </ViroARScene>
    );
  }

  function handleMoveToHome() {
    router.dismiss();
    router.replace("/home");
  }

  return (
    <>
      <SafeAreaView style={styles.headerContainer} />

      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: arGridScene }}
        style={styles.arContainer}
        worldAlignment="Camera"
      />

      <View style={styles.bottomContainer}>
        <Pressable style={styles.iconContainer} onPress={handleMoveToHome}>
          <HomeSvg width="30%" height="30%" color="#343a40" />
          <Text style={styles.iconText}>{MAIN_PAGE}</Text>
        </Pressable>
        <Pressable style={styles.plusIconContainer}>
          <PlusSvg width="65%" height="65%" color="#6CA0DC" />
        </Pressable>
        <View style={styles.iconContainer}>
          <MemoListSvg width="30%" height="30%" color="#343a40" />
          <Text style={styles.iconText}>{MEMO_LIST_PAGE}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.1,
  },
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
