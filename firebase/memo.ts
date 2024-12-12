import { database } from "@/firebaseConfig";
import { Database, get, ref, set } from "firebase/database";

export async function createMemo({
  userId,
  memoId,
  content,
  latitude,
  longitude,
  altitude,
}: {
  userId: string;
  memoId: string;
  content: string;
  latitude: number;
  longitude: number;
  altitude: number | null;
}) {
  await set(ref(database as Database, `memo/${userId}/${memoId}`), {
    content,
    latitude,
    longitude,
    altitude,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function getUserMemoList(userId: string) {
  const snapshot = await get(ref(database, `memo/${userId}`));
  return snapshot.val();
}
