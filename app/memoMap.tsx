import { useBoundStore } from "@/store/useBoundStore";
import { fixToSixDemicalPoints } from "@/utils/number";
import { useState } from "react";
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";

export default function MemoMap() {
  const userLocation = useBoundStore((state) => state.userLocation);
  const memoList = useBoundStore((state) => state.memoList);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [clusterMemoList, setClusterMemoList] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="standard"
        cameraZoomRange={{ minCenterCoordinateDistance: 2320 }}
        minPoints={1}
        clusterColor="#668CFF"
        onClusterPress={(cluster, markers) => {
          setClusterMemoList(
            markers.map((marker) => {
              return memoList.find((memo) => memo.memoId === marker.properties?.identifier);
            }),
          );
          setModalVisible(true);
        }}
        style={styles.mapContainer}
      >
        {memoList.map((memo) => (
          <Marker
            key={memo.memoId}
            identifier={memo.memoId}
            coordinate={{
              latitude: fixToSixDemicalPoints(memo.latitude),
              longitude: fixToSixDemicalPoints(memo.longitude),
            }}
          />
        ))}
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={{ flex: 1 }}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.scrollViewContainer}>
            {clusterMemoList.map((memo) => {
              return (
                <Pressable
                  key={memo.memoId}
                  onPress={() => setModalVisible(false)}
                  style={{ backgroundColor: "#ffc61a", margin: 5, width: "40%" }}
                >
                  <Text>{memo.content}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 0.9,
  },
  modalContainer: {
    height: "45%",
    marginTop: "auto",
    backgroundColor: "#FFFFFF",
  },
  scrollViewContainer: {
    padding: 10,
  },
  button: {
    width: 30,
    height: 30,
  },
});
