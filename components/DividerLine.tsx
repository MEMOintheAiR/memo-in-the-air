import { StyleSheet, Text, View } from "react-native";
import Svg, { Line } from "react-native-svg";

export default function DividerLine() {
  return (
    <View style={styles.dividerContainer}>
      <Svg width="300" height="10">
        <Line x1="0" y1="5" x2="300" y2="5" stroke="#BCBCBC" strokeWidth="1" />
      </Svg>
      <Text style={styles.dividerText}>또는</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dividerContainer: {
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingVertical: 20,
  },
  dividerText: {
    color: "#BCBCBC",
    fontSize: 14,
    position: "absolute",
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
});
