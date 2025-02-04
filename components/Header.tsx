import PreviousIcon from "@/assets/images/previous.svg";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

type HeaderProps = {
  headerStyle: ViewStyle;
  headerTitle: string;
  showPreviousButton: boolean;
  onPressFunc?: () => void;
};

export default function Header({
  headerStyle,
  headerTitle,
  showPreviousButton,
  onPressFunc,
}: HeaderProps) {
  return (
    <View style={headerStyle}>
      <Pressable style={styles.headerButton} onPress={onPressFunc}>
        {showPreviousButton && <PreviousIcon width="20" height="20" color="#343A40" />}
      </Pressable>
      <Text style={styles.headerText}>{headerTitle}</Text>
      <View style={styles.headerButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    flex: 1,
    alignItems: "center",
    margin: "auto",
  },
  headerText: {
    flex: 5,
    fontSize: 24,
    fontFamily: "SUITE-Medium",
    color: "#343A40",
    textAlign: "center",
    margin: "auto",
  },
});
