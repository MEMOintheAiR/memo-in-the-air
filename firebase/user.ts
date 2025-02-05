import { database } from "@/firebaseConfig";
import { Database, get, ref, set, update } from "firebase/database";

type userType = {
  userId: string;
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export async function upsertUserInfo(userInfo: userType) {
  const snapshot = await get(ref(database, `user/${userInfo.userId}`));

  if (!snapshot.exists()) {
    await set(ref(database as Database, `user/${userInfo.userId}`), {
      userId: userInfo.userId,
      uid: userInfo.uid,
      email: userInfo.email,
      displayName: userInfo.displayName,
      photoURL: userInfo.photoURL,
      lastSignInAt: new Date().toISOString(),
    });
  } else {
    await update(ref(database, `user/${userInfo.userId}`), {
      lastSignInAt: new Date().toISOString(),
    });
  }
}
