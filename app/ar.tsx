import HomeSvg from "../assets/images/home.svg";
import MemoListSvg from "../assets/images/memoList.svg";
import PlusSvg from "../assets/images/plus.svg";
import { MAIN_PAGE, MEMO_LIST_PAGE } from "@/constants/Pages";
import { ViroARScene, ViroARSceneNavigator } from "@reactvision/react-viro";
import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

function arScene() {
  return <ViroARScene />;
}

export default function ar() {
  function handleHome() {
    router.navigate("/");
  }

  return (
    <>
      <SafeAreaView style={styles.headerContainer} />
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: arScene }}
        style={styles.arContainer}
      />
      <View style={styles.bottomContainer}>
        <Pressable style={styles.iconContainer} onPress={handleHome}>
          <HomeSvg width="30%" height="30%" color="#343a40" />
          <Text style={styles.iconText}>{MAIN_PAGE}</Text>
        </Pressable>
        <View style={styles.plusIconContainer}>
          <PlusSvg width="65%" height="65%" color="#6CA0DC" />
        </View>
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
    color: "#343a40",
  },
  plusIconContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 3,
  },
});
