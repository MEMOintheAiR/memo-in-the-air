import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function locationPermission() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        해당 앱을 사용하기 위해선{"\n"} 사용자의 위치 확인에 대한 {"\n"}권한이 필요합니다.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    lineHeight: 35,
    fontWeight: 500,
  },
});
