import Button from "@/components/Button";
import DividerLine from "@/components/DividerLine";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { START_NON_USER_BUTTON } from "@/constants/Buttons";
import { APP_DESC, APP_TITLE } from "@/constants/Messages";
import { auth } from "@/firebaseConfig";
import { useBoundStore } from "@/store/useBoundStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthSessionResult } from "expo-auth-session/build/AuthSession.types";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Geolocation from "react-native-geolocation-service";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const setUserLocation = useBoundStore((state) => state.setUserLocation);
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
        router.replace("/(tabs)");
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

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, altitude } = position.coords;
        setUserLocation({ latitude, longitude, altitude: altitude || 0 });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  async function handleGoogleSiginResponse(response: AuthSessionResult) {
    const { id_token } = response.params;
    const credential = GoogleAuthProvider.credential(id_token);
    await signInWithCredential(auth, credential);
  }

  function handleGoogleSignIn() {
    promptAsync();
  }

  function handleStartNonUser() {
    router.push("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/logo-vertical.png")}
          width={200}
          height={200}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.titleText}>{APP_TITLE}</Text>
        <Text style={styles.descText}>{APP_DESC}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <GoogleSignInButton onPressFunc={handleGoogleSignIn} />
        <DividerLine />
        <Button
          buttonText={START_NON_USER_BUTTON}
          style={styles.startNonUserButton}
          textStyle={styles.signInText}
          onPressFunc={handleStartNonUser}
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
    backgroundColor: "#FFFFFF",
    gap: 70,
  },
  imageContainer: {
    flex: 4,
    justifyContent: "flex-end",
  },
  image: {
    transform: [{ scale: 0.8 }],
    alignItems: "center",
    justifyContent: "flex-end",
  },
  titleText: {
    fontFamily: "SUITE-Bold",
    fontSize: 25,
    color: "#343A40",
    textAlign: "center",
    marginBottom: 5,
  },
  descText: {
    fontFamily: "SUITE-SemiBold",
    fontSize: 18,
    color: "#343A40",
    textAlign: "center",
    lineHeight: 25,
  },
  buttonContainer: {
    flex: 3,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
  },
  startNonUserButton: {
    width: 300,
    backgroundColor: "#5E8BCE",
    borderColor: "#5E8BCE",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: "auto",
    paddingVertical: 12,
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 20,
    fontFamily: "Roboto-medium",
    fontWeight: 500,
    textAlign: "center",
    marginVertical: "auto",
  },
});
