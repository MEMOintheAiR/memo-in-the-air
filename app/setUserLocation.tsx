import PreviousIcon from "@/assets/images/previous.svg";
import { SET_CURRENT_LOCATION_BUTTON, SET_UPDATED_LOCATION_BUTTON } from "@/constants/Buttons";
import { SET_LOCATION_PAGE } from "@/constants/Pages";
import { COORDS_DELTA, DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "@/constants/Variable";
import { useBoundStore } from "@/store/useBoundStore";
import { fixToSixDemicalPoints } from "@/utils/number";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Geolocation from "react-native-geolocation-service";
import MapView, { Marker } from "react-native-maps";

type locationProps = {
  latitude: number;
  longitude: number;
  altitude: number;
};

export default function SetUserLocation() {
  const setUserLocation = useBoundStore((state) => state.setUserLocation);

  const [buttonText, setButtonText] = useState<string>(SET_CURRENT_LOCATION_BUTTON);
  const [currentLocation, setCurrentLocation] = useState<locationProps>({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
    altitude: 0,
  });
  const [tempUserLocation, setTempUserLocation] = useState<locationProps>({
    latitude: 0,
    longitude: 0,
    altitude: 0,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, altitude } = position.coords;
        setCurrentLocation({ latitude, longitude, altitude: altitude || 0 });
        setTempUserLocation({ latitude, longitude, altitude: altitude || 0 });
      },
      () => {
        setTempUserLocation(currentLocation);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  function handleMoveToBack(): void {
    router.back();
  }

  function setUpUserLocation(): void {
    setUserLocation({
      latitude: fixToSixDemicalPoints(tempUserLocation.latitude),
      longitude: fixToSixDemicalPoints(tempUserLocation.longitude),
      altitude: fixToSixDemicalPoints(tempUserLocation.altitude),
    });

    router.push("/arWebview");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.headerButton} onPress={handleMoveToBack}>
          <PreviousIcon width="20" height="20" color="#343A40" />
        </Pressable>
        <Text style={styles.headerText}>{SET_LOCATION_PAGE}</Text>
        <View style={styles.headerButton} />
      </View>
      <MapView
        style={styles.mapContainer}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: COORDS_DELTA,
          longitudeDelta: COORDS_DELTA,
        }}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: COORDS_DELTA,
          longitudeDelta: COORDS_DELTA,
        }}
        onPress={(e) => {
          setTempUserLocation({
            ...tempUserLocation,
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
          setButtonText(SET_UPDATED_LOCATION_BUTTON);
        }}
      >
        <Marker
          coordinate={{
            latitude: tempUserLocation.latitude,
            longitude: tempUserLocation.longitude,
          }}
        />
      </MapView>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.buttonContainer} onPress={setUpUserLocation}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.8,
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
    fontWeight: 500,
    color: "#343A40",
    textAlign: "center",
    margin: "auto",
  },
  mapContainer: {
    flex: 10,
  },
  bottomContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#668CFF",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 700,
    color: "#FFFFFF",
  },
});
