import { upsertUserInfo } from "@/firebase/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
import { User } from "firebase/auth";

type userType = {
  userId: string;
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export async function saveAppleUserInfo(
  userId: string,
  userInfo: AppleAuthentication.AppleAuthenticationCredential,
  setUserInfo: (user: userType) => void,
) {
  const user = await upsertUserInfo({
    userId: userId,
    uid: userInfo.user,
    email: userInfo.email,
    displayName: `${userInfo.fullName?.givenName + " " + userInfo.fullName?.familyName}`,
    photoURL: "",
  });

  await AsyncStorage.setItem("userInfo", JSON.stringify(user));
  setUserInfo(user);
}

export async function saveGoogleUserInfo(
  userId: string,
  userInfo: User,
  setUserInfo: (user: userType) => void,
) {
  const user = await upsertUserInfo({
    userId: userId,
    uid: userInfo.uid,
    email: userInfo.email,
    displayName: userInfo.displayName,
    photoURL: userInfo.photoURL,
  });

  await AsyncStorage.setItem("userInfo", JSON.stringify(user));
  setUserInfo(user);
}
