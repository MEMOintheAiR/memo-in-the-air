import Button from "@/components/Button";
import { START_BUTTON } from "@/constants/Buttons";
import { router } from "expo-router";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

export default function home() {
  function handleMoveToAR() {
    router.push("/setUserLocation");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/logo-vertical.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonText={START_BUTTON}
          style={styles.start}
          textStyle={styles.startText}
          onPressFunc={handleMoveToAR}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F4D9",
  },
  imageContainer: {
    flex: 7,
  },
  image: {
    flex: 1,
    transform: [{ scale: 1 }],
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  start: {
    width: "85%",
    height: 60,
    backgroundColor: "#FFFFFF",
    borderColor: "#6CA0DC",
    borderWidth: 1.3,
    borderRadius: 50,
  },
  startText: {
    color: "#6CA0DC",
    fontSize: 27,
    fontFamily: "SUITE-Bold",
    fontWeight: 900,
    textAlign: "center",
    margin: "auto",
  },
});
