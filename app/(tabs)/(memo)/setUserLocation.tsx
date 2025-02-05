import Header from "@/components/Header";
import ShadowButton from "@/components/ShadowButton";
import { SET_CURRENT_LOCATION_BUTTON, SET_UPDATED_LOCATION_BUTTON } from "@/constants/Buttons";
import { SET_LOCATION_PAGE } from "@/constants/Pages";
import { COORDS_DELTA, DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "@/constants/Variable";
import { useBoundStore } from "@/store/useBoundStore";
import { fixToSixDemicalPoints } from "@/utils/number";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
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
      <Header
        headerStyle={styles.headerContainer}
        headerTitle={SET_LOCATION_PAGE}
        showPreviousButton={false}
      />
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
      <ShadowButton
        buttonStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
        buttonText={buttonText}
        onPressFunc={setUpUserLocation}
      />
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
  mapContainer: {
    flex: 10,
  },
  buttonContainer: {
    width: "70%",
    height: 50,
    position: "absolute",
    bottom: 25,
    left: "15%",
    borderRadius: 25,
    backgroundColor: "#5E8BCE",
  },
  buttonText: {
    fontSize: 22,
    fontFamily: "SUITE-Bold",
    color: "#FFFFFF",
  },
});
