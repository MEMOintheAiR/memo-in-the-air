import Button from "@/components/Button";
import { CREATE_BUTTON, LIST_BUTTON } from "@/constants/Buttons";
import { router } from "expo-router";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

export default function Main() {
  function handleMoveToAR() {
    router.push("/arWebview");
  }

  function handleMoveToMemoList(): void {
    router.push("/memoMap");
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
          buttonText={CREATE_BUTTON}
          style={styles.blueButton}
          textStyle={styles.whiteText}
          onPressFunc={handleMoveToAR}
        />
        <Button
          buttonText={LIST_BUTTON}
          style={styles.whiteButton}
          textStyle={styles.blueText}
          onPressFunc={handleMoveToMemoList}
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
    flex: 2,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
  },
  blueButton: {
    width: "85%",
    height: 55,
    backgroundColor: "#5E8BCE",
    borderColor: "#5E8BCE",
    borderWidth: 1.3,
    borderRadius: 50,
  },
  whiteButton: {
    width: "85%",
    height: 55,
    backgroundColor: "#FFFFFF",
    borderColor: "#5E8BCE",
    borderWidth: 1.3,
    borderRadius: 50,
  },
  blueText: {
    color: "#5E8BCE",
    fontSize: 25,
    fontFamily: "SUITE-Bold",
    textAlign: "center",
    margin: "auto",
  },
  whiteText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontFamily: "SUITE-Bold",
    textAlign: "center",
    margin: "auto",
  },
});
