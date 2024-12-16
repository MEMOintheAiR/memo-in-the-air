import { getMemoList } from "@/firebase/memo";
import { useBoundStore } from "@/store/useBoundStore";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";

export default function Loading() {
  const userId = useBoundStore((state) => state.userId);
  const setMemoList = useBoundStore((state) => state.setMemoList);

  async function getUserMemoList() {
    const memoList = await getMemoList(userId);
    setMemoList(memoList || []);

    router.dismiss();
    router.push("/arWebview");
  }

  useEffect(() => {
    getUserMemoList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
