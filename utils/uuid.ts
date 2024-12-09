import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 } from "uuid";

export async function checkUserId(): Promise<string> {
  let userId: string | null = await SecureStore.getItemAsync("userId");

  if (userId === null) {
    userId = createUUID();
    await SecureStore.setItemAsync("userId", JSON.stringify(userId));
  }

  return userId;
}

export function createUUID(): string {
  return v4();
}
