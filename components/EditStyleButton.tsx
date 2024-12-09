import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type EditStyleButtonProps = {
  text: string;
  imageName: number;
  onPressFunc?: () => void;
};

export default function EditStyleButton({ text, imageName, onPressFunc }: EditStyleButtonProps) {
  return (
    <Pressable style={styles.container} onPress={onPressFunc}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.imageContainer}>
        <Image source={imageName} style={styles.image} resizeMode="contain" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: "#D7D7D7",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: 35,
    height: 35,
    margin: "auto",
  },
});
