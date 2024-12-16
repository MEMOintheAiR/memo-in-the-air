import HomeSvg from "@/assets/images/home.svg";
import MemoListSvg from "@/assets/images/memoList.svg";
import PlusSvg from "@/assets/images/plus.svg";
import { MAIN_PAGE, MEMO_LIST_PAGE } from "@/constants/Pages";
import { useBoundStore } from "@/store/useBoundStore";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export default function ARWebView() {
  const memoList = useBoundStore((state) => state.memoList);
  const setUserLocation = useBoundStore((state) => state.setUserLocation);
  const setMemoLocation = useBoundStore((state) => state.setMemoLocation);

  const webViewRef = useRef<WebView>(null);
  const [isGridVisible, setIsGridVisible] = useState<boolean>(false);

  useEffect(() => {
    getUserCurrentLocation();
  }, []);

  async function getUserCurrentLocation() {
    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
      });
    }
  }

  async function getMemoCurrentLocation() {
    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      setMemoLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
      });
    }
  }

  async function handleWebViewMessage(event: WebViewMessageEvent) {
    const type: string = event.nativeEvent.data;
    await getMemoCurrentLocation();

    if (type === "grid-click") {
      router.push("/memoEdit");
    }
  }

  function handleMoveToHome() {
    router.back();
  }

  function putMemoList() {
    if (memoList.length === 0) {
      return;
    }

    let index = 0;
    let memoHtmlToAdd = "";

    for (const [key, value] of Object.entries(memoList)) {
      memoHtmlToAdd += `
        const memo${index} = document.createElement("a-plane");
        memo${index}.setAttribute("id", "${key}");
        memo${index}.setAttribute("gps-new-entity-place", "latitude: ${value.latitude}; longitude: ${value.longitude};");
        memo${index}.setAttribute("position", "0 ${value.altitude} -5");
        memo${index}.setAttribute("material", "color: #FFFF4C;");

        document.getElementById("arCamera")?.append(memo${index});
      `;
      index++;
    }
    memoHtmlToAdd += "true;";

    return memoHtmlToAdd;
  }

  function handleClickPlusButton() {
    if (!isGridVisible) {
      setIsGridVisible(true);
      webViewRef.current?.injectJavaScript(`
        const aPlane = document.createElement("a-plane");
        aPlane.setAttribute("position", "0 0 -3");
        aPlane.setAttribute("rotation", "0 0 0");
        aPlane.setAttribute("width", "1.5");
        aPlane.setAttribute("height", "1.5");
        aPlane.setAttribute("material", "color: #FFFF4C; opacity: 0.7;");
        aPlane.setAttribute("id", "memoGrid");

        document.getElementById("arCamera")?.appendChild(aPlane);

        document.getElementById("aScene").addEventListener("click", function () {
          window.ReactNativeWebView.postMessage("grid-click");
        });

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
        injectedJavaScript={putMemoList()}
        onMessage={handleWebViewMessage}
        style={styles.arContainer}
      />

      <View style={styles.bottomContainer}>
        <Pressable style={styles.iconContainer} onPress={handleMoveToHome}>
          <HomeSvg width="30%" height="30%" color="#343A40" />
          <Text style={styles.iconText}>{MAIN_PAGE}</Text>
        </Pressable>

        {isGridVisible ? (
          <View style={styles.plusIconContainer}></View>
        ) : (
          <Pressable style={styles.plusIconContainer} onPress={handleClickPlusButton}>
            <PlusSvg width="65%" height="65%" color="#6CA0DC" />
          </Pressable>
        )}

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
  plusIconContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 3,
  },
});
