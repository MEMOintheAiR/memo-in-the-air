import { database } from "@/firebaseConfig";
import { Database, ref, set } from "firebase/database";

export async function createMemo(userId: string, memoId: string, content: string) {
  console.log(memoId, userId, content);
  await set(ref(database as Database, `memo/${userId}/${memoId}`), {
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
