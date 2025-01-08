import { database } from "@/firebaseConfig";
import { Database, get, ref, set } from "firebase/database";

type memoType = {
  memoId: string;
  latitude: number;
  longitude: number;
  altitude: number;
  direction: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export async function createMemo({
  userId,
  memoId,
  content,
  latitude,
  longitude,
  altitude,
  direction,
}: {
  userId: string;
  memoId: string;
  content: string;
  latitude: number;
  longitude: number;
  altitude: number | 0;
  direction: number;
}) {
  await set(ref(database as Database, `memo/${userId}/${memoId}`), {
    content,
    latitude,
    longitude,
    altitude,
    direction,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function getMemoList(userId: string) {
  const snapshot = await get(ref(database, `memo/${userId}`));

  const memoList: memoType[] = [];
  for (const [key, value] of Object.entries<memoType>(snapshot.val())) {
    memoList.push({
      ...value,
      memoId: key,
      latitude: Number(value.latitude),
      longitude: Number(value.longitude),
      altitude: Number(value.altitude),
      direction: Number(value.direction),
    });
  }

  return memoList;
}
