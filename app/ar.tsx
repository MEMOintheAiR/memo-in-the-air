import HomeSvg from "../assets/images/home.svg";
import MemoListSvg from "../assets/images/memoList.svg";
import PlusSvg from "../assets/images/plus.svg";
import { MAIN_PAGE, MEMO_LIST_PAGE } from "@/constants/Pages";
import { ViroARScene, ViroARSceneNavigator } from "@reactvision/react-viro";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

function arScene() {
  return <ViroARScene />;
}

export default function ar() {
  return (
    <>
      <SafeAreaView />
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: arScene }}
        style={styles.arContainer}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.iconContainer}>
          <HomeSvg width="30%" height="30%" color="#343a40" />
          <Text style={styles.iconText}>{MAIN_PAGE}</Text>
        </View>
        <View style={styles.plusIconContainer}>
          <PlusSvg width="80%" height="80%" color="#6CA0DC" />
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
  arContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 0.2,
    flexDirection: "row",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 20,
    marginTop: 10,
    color: "#343a40",
  },
  plusIconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
});
