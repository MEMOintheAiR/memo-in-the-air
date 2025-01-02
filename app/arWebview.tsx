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
  const userLocation = useBoundStore((state) => state.userLocation);
  const setMemoLocation = useBoundStore((state) => state.setMemoLocation);

  const webViewRef = useRef<WebView>(null);
  const [isGridVisible, setIsGridVisible] = useState<boolean>(false);

  useEffect(() => {
    watchUserLocationChanged();
  }, []);

  function watchUserLocationChanged(): void {
    Location.watchPositionAsync({ distanceInterval: 0.1 }, ({ coords }) => {
      if (coords && userLocation.latitude !== 0 && userLocation.longitude !== 0) {
        const changedLatitude = coords.latitude;
        const changedLongitude = coords.longitude;
        const changedAltitude = coords.altitude || 0;

        updateMemoPosition(changedLatitude, changedLongitude, changedAltitude);
      }
    });
  }

  async function getMemoCurrentLocation(): Promise<void> {
    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      setMemoLocation({
        latitude: Number(coords.latitude.toFixed(6)),
        longitude: Number(coords.longitude.toFixed(6)),
        altitude: Number(coords.altitude?.toFixed(6)) || 0,
      });
    }
  }

  async function handleWebViewMessage(event: WebViewMessageEvent): Promise<void> {
    const type: string = event.nativeEvent.data;
    await getMemoCurrentLocation();

    if (type === "grid-click") {
      router.push("/memoEdit");
    }
  }

  function handleMoveToHome(): void {
    router.back();
  }

  function putMemoList(): string | undefined {
    if (
      Object.keys(memoList).length === 0 ||
      userLocation.latitude === 0 ||
      userLocation.longitude === 0 ||
      userLocation.altitude === 0
    ) {
      return;
    }

    let index = 0;
    let memoHtmlToAdd = "";

    for (const memo of Object.values(memoList)) {
      const xPosition: number = ((userLocation.latitude - memo.latitude) * 0.111) / 0.000001;
      const yPosition: number = memo.altitude - userLocation.altitude;
      const zPosition: number =
        ((userLocation.longitude - memo.longitude) * 0.089) / 0.000001 || -3;
      const memoSize = zPosition < 5 ? Math.abs(1 * zPosition) : Math.abs(1 * zPosition) / 2;

      memoHtmlToAdd += `
        const memoText${index} = document.createElement("a-entity");
        memoText${index}.setAttribute("text", {
          value: "${value.content}",
          color: "#000000",
          align: "center",
        });
        memoText${index}.setAttribute("position", "0 0 0.1");
        memoText${index}.setAttribute("scale", "${fontSize} ${fontSize} 0");

        const memo${index} = document.createElement("a-plane");
        memo${index}.setAttribute("id", "${key}");
        memo${index}.setAttribute("position", "${xPosition} ${yPosition} ${zPosition < 0 ? zPosition : -zPosition}");
        memo${index}.setAttribute("material", "color: #FFFF4C;");
        memo${index}.setAttribute("width", "${memoSize}");
        memo${index}.setAttribute("height", "${memoSize}");

        memo${index}.appendChild(memoText${index});
        document.getElementById("aScene")?.appendChild(memo${index});
      `;
      index++;
    }

    memoHtmlToAdd += "true;";
    return memoHtmlToAdd;
  }

  function updateMemoPosition(latitude: number, longitude: number, altitude: number): void | null {
    if (Object.keys(memoList).length === 0) {
      return null;
    }

    let memoHtmlToUpdate = "";
    for (const [key, value] of Object.entries(memoList)) {
      const movingXPosition: number =
        Number((value.longitude - userLocation.longitude).toFixed(8)) * 88804 -
        Number((userLocation.longitude - longitude).toFixed(8)) * 88804;
      const movingYPosition: number =
        Number((value.altitude - userLocation.altitude).toFixed(8)) -
        Number((userLocation.altitude - altitude).toFixed(8));
      const movingZPosition: number =
        Number((value.latitude - userLocation.latitude).toFixed(8)) * 111000 -
        Number((userLocation.latitude - latitude).toFixed(8)) * 111000;

      memoHtmlToUpdate += `
        document.getElementById("${key}").setAttribute("position", "${movingXPosition} ${movingYPosition} ${movingZPosition < 0 ? movingZPosition : -movingZPosition}");
      `;
    }
    memoHtmlToUpdate += "true;";

    webViewRef.current?.injectJavaScript(memoHtmlToUpdate);
  }

  function handleClickPlusButton(): void {
    if (!isGridVisible) {
      setIsGridVisible(true);
      webViewRef.current?.injectJavaScript(`
        const arCamera = document.createElement("a-camera");
        arCamera.setAttribute("id", "arCamera");
        arCamera.setAttribute("gps-new-camera", "");
        arCamera.setAttribute("arjs-device-orientation-controls", "smoothingFactor: 0.1");

        const aPlane = document.createElement("a-plane");
        aPlane.setAttribute("position", "0 0 -3");
        aPlane.setAttribute("rotation", "0 0 0");
        aPlane.setAttribute("width", "1.5");
        aPlane.setAttribute("height", "1.5");
        aPlane.setAttribute("material", "color: #FFFF4C; opacity: 0.7;");
        aPlane.setAttribute("id", "memoGrid");

        arCamera.appendChild(aPlane);
        document.getElementById("aScene").appendChild(arCamera);

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
        mediaCapturePermissionGrantType={"grantIfSameHostElsePrompt"}
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
