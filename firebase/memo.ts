import { database } from "@/firebaseConfig";
import { Database, ref, set } from "firebase/database";

export async function createMemo(memoId: string, userId: string, content: string) {
  await set(ref(database as Database, `memo/${memoId}`), {
    userId,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
