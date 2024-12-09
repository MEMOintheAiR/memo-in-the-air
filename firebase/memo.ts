import { database } from "@/firebaseConfig";
import { Database, ref, set } from "firebase/database";

export async function createMemo(userId: string, content: string) {
  await set(ref(database as Database, `memo/${userId}`), {
    content: content,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
