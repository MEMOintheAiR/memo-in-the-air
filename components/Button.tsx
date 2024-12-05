import { Pressable, Text, TextStyle, ViewStyle } from "react-native";

type ButtonProps = {
  style: ViewStyle;
  textStyle: TextStyle;
  buttonText: string;
};

export default function Button({ buttonText, style, textStyle }: ButtonProps) {
  return (
    <Pressable style={style}>
      <Text style={textStyle}>{buttonText}</Text>
    </Pressable>
  );
}
