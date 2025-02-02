import Button from "@/components/Button";
import { LOGIN_BUTTON, START_BUTTON } from "@/constants/Buttons";
import { auth } from "@/firebaseConfig";
import { useBoundStore } from "@/store/useBoundStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthSessionResult } from "expo-auth-session/build/AuthSession.types";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Home() {
  const setUserInfo = useBoundStore((state) => state.setUserInfo);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_FIREBASE_IOS_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      handleGoogleSiginResponse(response);
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("userInfo", JSON.stringify(user));
        setUserInfo({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleGoogleSiginResponse(response: AuthSessionResult) {
    const { id_token } = response.params;
    const credential = GoogleAuthProvider.credential(id_token);
    await signInWithCredential(auth, credential);
  }

  function handleGoogleSignIn() {
    promptAsync();
  }

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
          buttonText={LOGIN_BUTTON}
          style={styles.login}
          textStyle={styles.loginText}
          onPressFunc={handleGoogleSignIn}
        />
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
    flex: 2,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
  },
  login: {
    width: "85%",
    height: 55,
    backgroundColor: "#FFFFFF",
    borderColor: "#5E8BCE",
    borderWidth: 1.3,
    borderRadius: 50,
  },
  loginText: {
    color: "#5E8BCE",
    fontSize: 25,
    fontFamily: "SUITE-Bold",
    textAlign: "center",
    margin: "auto",
  },
  start: {
    width: "85%",
    height: 55,
    backgroundColor: "#5E8BCE",
    borderColor: "#5E8BCE",
    borderWidth: 1.3,
    borderRadius: 50,
  },
  startText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontFamily: "SUITE-Bold",
    textAlign: "center",
    margin: "auto",
  },
});
