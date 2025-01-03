import { getMemoList } from "@/firebase/memo";
import { useBoundStore } from "@/store/useBoundStore";
import { fixToSixDemicalPoints } from "@/utils/number";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";

export default function MemoMap() {
  const userId = useBoundStore((state) => state.userId);
  const userLocation = useBoundStore((state) => state.userLocation);
  const memoList = useBoundStore((state) => state.memoList);
  const setMemoList = useBoundStore((state) => state.setMemoList);

  async function getUserMemoList(): Promise<void> {
    const memoList = await getMemoList(userId);
    setMemoList(memoList || []);
  }

  useEffect(() => {
    getUserMemoList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        clusterColor="#668CFF"
        mapType="standard"
        cameraZoomRange={{ minCenterCoordinateDistance: 2320 }}
        style={styles.mapContainer}
      >
        {memoList.map((memo) => (
          <Marker
            key={memo.memoId}
            coordinate={{
              latitude: fixToSixDemicalPoints(memo.latitude),
              longitude: fixToSixDemicalPoints(memo.longitude),
            }}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 0.9,
  },
};
