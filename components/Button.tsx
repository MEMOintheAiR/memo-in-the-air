import { Pressable, Text, TextStyle, ViewStyle } from "react-native";

type ButtonProps = {
  style: ViewStyle;
  textStyle: TextStyle;
  buttonText: string;
  onPressFunc?: () => void;
};

export default function Button({ buttonText, style, textStyle, onPressFunc }: ButtonProps) {
  return (
    <Pressable style={style} onPressIn={onPressFunc}>
      <Text style={textStyle}>{buttonText}</Text>
    </Pressable>
  );
}
