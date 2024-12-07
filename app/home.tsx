import Button from "@/components/Button";
import { LOGIN_BUTTON, START_BUTTON } from "@/constants/Buttons";
import { router } from "expo-router";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

export default function home() {
  function handleMoveToAR() {
    router.push("/ar");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button buttonText={LOGIN_BUTTON} style={styles.login} textStyle={styles.loginText} />
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
  },
  imageContainer: {
    flex: 6,
  },
  image: {
    flex: 1,
    transform: [{ scale: 0.9 }],
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flex: 2,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    width: "60%",
    height: 50,
    backgroundColor: "#6CA0DC",
    borderColor: "#6CA0DC",
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 10,
  },
  loginText: {
    flex: 1,
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: 700,
    paddingVertical: 10,
  },
  start: {
    width: "60%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderColor: "#6CA0DC",
    borderWidth: 2,
    borderRadius: 20,
  },
  startText: {
    flex: 1,
    fontSize: 23,
    color: "#6CA0DC",
    textAlign: "center",
    fontWeight: 700,
    paddingVertical: 10,
  },
});
