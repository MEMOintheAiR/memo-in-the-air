import CloseIcon from "@/assets/images/close.svg";
import PreviousIcon from "@/assets/images/previous.svg";
import { MEMO_LIST_PAGE } from "@/constants/Pages";
import { COORDS_DELTA } from "@/constants/Variable";
import { useBoundStore } from "@/store/useBoundStore";
import { fixToSixDemicalPoints, formatDate } from "@/utils/number";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";

export default function MemoMap() {
  const userLocation = useBoundStore((state) => state.userLocation);
  const memoList = useBoundStore((state) => state.memoList);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [clusterMemoList, setClusterMemoList] = useState<memoType[] | []>([]);
  const [clusterAddress, setClusterAddress] = useState<string>("");

  function handleMoveToBack(): void {
    router.back();
  }

  async function getClusterAddress(coords: { latitude: number; longitude: number }): Promise<void> {
    const address = await Location.reverseGeocodeAsync(coords);
    setClusterAddress(address[0].region + " " + address[0].district);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.headerButton} onPress={handleMoveToBack}>
          <PreviousIcon width="20" height="20" color="#343A40" />
        </Pressable>
        <Text style={styles.headerText}>{MEMO_LIST_PAGE}</Text>
        <View style={styles.headerButton} />
      </View>

      <MapView
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: COORDS_DELTA,
          longitudeDelta: COORDS_DELTA,
        }}
        mapType="standard"
        minPoints={1}
        clusterColor="#668CFF"
        onClusterPress={(_, markers) => {
          getClusterAddress({
            latitude: markers[0].properties.coordinate.latitude,
            longitude: markers[0].properties.coordinate.longitude,
          });
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
            onPress={() => {
              getClusterAddress({ latitude: memo.latitude, longitude: memo.longitude });
              setClusterMemoList([memo]);
              setModalVisible(true);
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
            <Text style={styles.modalHeaderText}>
              <Text style={styles.addressText}>{clusterAddress}</Text>에 위치한 메모
            </Text>
            <View style={styles.iconContainer}></View>
          </View>
          <FlatList
            data={clusterMemoList}
            renderItem={({ item }) => (
              <View style={styles.memoInfoContainer}>
                <Pressable key={item.memoId} style={styles.memoContainer}>
                  <Text style={styles.memoText}>{item.content}</Text>
                </Pressable>
                <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
              </View>
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
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  headerButton: {
    flex: 1,
    alignItems: "center",
    margin: "auto",
  },
  headerText: {
    flex: 5,
    fontSize: 24,
    fontFamily: "SUITE-Medium",
    color: "#343A40",
    textAlign: "center",
    margin: "auto",
  },
  mapContainer: {
    flex: 8,
  },
  modalContainer: {
    flex: 1,
  },
  modalViewContainer: {
    width: "100%",
    height: "45%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFFFFF",
  },
  modalHeaderContainer: {
    marginBottom: 8,
    flexDirection: "row",
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  modalHeaderText: {
    flex: 7,
    fontSize: 22,
    fontFamily: "SUITE-Regular",
    textAlign: "center",
  },
  addressText: {
    fontFamily: "SUITE-Bold",
  },
  flatListContainer: {
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: "8%",
  },
  memoInfoContainer: {
    width: "40%",
    marginHorizontal: 10,
    marginVertical: 13,
  },
  memoContainer: {
    aspectRatio: 1,
    backgroundColor: "#FDE44B",
  },
  memoText: {
    color: "#343A40",
    fontSize: 18,
    fontFamily: "SUITE-SemiBold",
    textAlign: "center",
    margin: "auto",
  },
  dateText: {
    color: "#5B5B5B",
    fontSize: 15,
    fontFamily: "SUITE-Regular",
    textAlign: "center",
    marginTop: 5,
  },
});
