import HomeSvg from "@/assets/images/home.svg";
import MemoListSvg from "@/assets/images/memoList.svg";
import PlusSvg from "@/assets/images/plus.svg";
import { MAIN_PAGE, MEMO_LIST_PAGE } from "@/constants/Pages";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function ARWebView() {
  const webViewRef = useRef<WebView>(null);
  const [isGridVisible, setIsGridVisible] = useState<boolean>(false);

  function handleMoveToHome() {
    router.back();
  }

  function handleClickPlusButton() {
    if (!isGridVisible) {
      setIsGridVisible(true);
      webViewRef.current?.injectJavaScript(`
        const aPlane = document.createElement("a-plane");
        aPlane.setAttribute("position", "0 1.7 -5");
        aPlane.setAttribute("rotation", "0 0 0");
        aPlane.setAttribute("width", "1.5");
        aPlane.setAttribute("height", "1.5");
        aPlane.setAttribute("material", "color: #FFFF4C; opacity: 0.7;");
        aPlane.setAttribute("id", "memoGrid");

        document.getElementById("aScene")?.appendChild(aPlane);
        true;
      `);
    }
  }

  return (
    <>
      <WebView
        ref={webViewRef}
        source={{ uri: "https://memointheair-ar.netlify.app/" }}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        style={styles.arContainer}
      />

      <View style={styles.bottomContainer}>
        <Pressable style={styles.iconContainer} onPress={handleMoveToHome}>
          <HomeSvg width="30%" height="30%" color="#343A40" />
          <Text style={styles.iconText}>{MAIN_PAGE}</Text>
        </Pressable>
        <Pressable style={styles.plusIconContainer} onPress={handleClickPlusButton}>
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
