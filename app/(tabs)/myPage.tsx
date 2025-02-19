import User from "@/assets/images/user.svg";
import Header from "@/components/Header";
import { useBoundStore } from "@/store/useBoundStore";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function MyPage() {
  const userInfo = useBoundStore((state) => state.userInfo);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerStyle={styles.headerContainer}
        headerTitle={"마이페이지"}
        showPreviousButton={false}
      />
      <View style={styles.myPageContainer}>
        <View style={styles.profileContainer}>
          <User width={50} height={50} />
          <View style={styles.userInfoContainer}>
            <Text style={{ color: "#000000" }}>{userInfo.email}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  myPageContainer: {
    flex: 8,
  },
  profileContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 5,
  },
});
