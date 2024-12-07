import { router } from "expo-router";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";

export default function Loading() {
  window.setTimeout(() => {
    router.dismiss();
    router.push("/arGrid");
  }, 1000);

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
