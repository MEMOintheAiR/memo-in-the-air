import EditStyleButton from "@/components/EditStyleButton";
import { COLOR, RESIZE, SHAPE, TEXT } from "@/constants/EditStyle";
import { StyleSheet, View } from "react-native";

export default function memoEdit() {
  return (
    <View style={styles.container}>
      <View style={styles.editViewContainer}></View>
      <View style={styles.editTabContainer}>
        <EditStyleButton text={TEXT} imageName={require("../assets/images/text.png")} />
        <EditStyleButton text={SHAPE} imageName={require("../assets/images/shape.png")} />
        <EditStyleButton text={COLOR} imageName={require("../assets/images/colorPicker.png")} />
        <EditStyleButton text={RESIZE} imageName={require("../assets/images/resize.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editViewContainer: {
    flex: 8,
    backgroundColor: "#E5E8E8",
  },
  editTabContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 25,
    backgroundColor: "#FFFFFF",
  },
});
