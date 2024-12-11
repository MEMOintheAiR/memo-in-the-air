import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function NotFound() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.errorCode}>404</Text>
      <Text style={styles.errorText}>해당 페이지를{"\n"}찾을 수 없습니다.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
  },
  errorCode: {
    color: "#FF0000",
    fontSize: 50,
  },
  errorText: {
    fontSize: 30,
    textAlign: "center",
    lineHeight: 40,
  },
});
