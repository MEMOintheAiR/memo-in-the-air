import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";

type BottomButtonProps = {
  buttonStyle: ViewStyle;
  textStyle: TextStyle;
  buttonText: string;
  onPressFunc: () => void;
};

export default function BottomButton({
  buttonStyle,
  textStyle,
  buttonText,
  onPressFunc,
}: BottomButtonProps) {
  return (
    <Pressable
      style={[styles.buttonContainer, styles.buttonShadow, buttonStyle]}
      onPress={onPressFunc}
    >
      <Text style={textStyle}>{buttonText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  buttonShadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
