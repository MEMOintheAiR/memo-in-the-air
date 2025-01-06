import CloseIcon from "@/assets/images/close.svg";
import { useBoundStore } from "@/store/useBoundStore";
import { fixToSixDemicalPoints } from "@/utils/number";
import { useState } from "react";
import { FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
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
        style={styles.modalContainer}
      >
        <View style={styles.modalViewContainer}>
          <View style={styles.modalHeaderContainer}>
            <Pressable onPress={() => setModalVisible(false)} style={styles.iconContainer}>
              <CloseIcon width="25" height="25" color="#000000" />
            </Pressable>
            <Text style={styles.headerText}>선택한 위치에 저장된 메모 목록</Text>
            <View style={styles.iconContainer}></View>
          </View>
          <FlatList
            data={clusterMemoList}
            renderItem={({ item }) => (
              <Pressable key={item.memoId} style={styles.memoContainer}>
                <Text style={styles.memoText}>{item.content}</Text>
              </Pressable>
            )}
            keyExtractor={(item) => item.memoId}
            numColumns={2}
            columnWrapperStyle={styles.flatListContainer}
          />
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
    flex: 1,
  },
  modalViewContainer: {
    height: "45%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalHeaderContainer: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  headerText: {
    flex: 7,
    fontSize: 21,
    fontWeight: 500,
    textAlign: "center",
  },
  flatListContainer: {
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: "8%",
  },
  memoContainer: {
    width: "40%",
    aspectRatio: 1,
    marginHorizontal: 10,
    marginVertical: 13,
    backgroundColor: "#FDE44B",
  },
  memoText: {
    color: "#343A40",
    fontSize: 18,
    textAlign: "center",
    margin: "auto",
  },
});
