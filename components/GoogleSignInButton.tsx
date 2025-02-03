import GoogleLogo from "@/assets/images/googleLogo.svg";
import { SIGNIN_GOOGLE_BUTTON } from "@/constants/Buttons";
import { Pressable, StyleSheet, Text } from "react-native";

type GoogleSignInButtonProps = {
  onPressFunc: () => void;
};

export default function GoogleSignInButton({ onPressFunc }: GoogleSignInButtonProps) {
  return (
    <Pressable style={styles.buttonContainer} onPress={onPressFunc}>
      <GoogleLogo width={20} height={20} style={styles.googleLogoImage} />
      <Text style={styles.signInText}>{SIGNIN_GOOGLE_BUTTON}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    backgroundColor: "#FFFFFF",
    borderColor: "#747775",
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: "auto",
    paddingVertical: 12,
  },
  googleLogoImage: {
    marginVertical: "auto",
    marginRight: 10,
  },
  signInText: {
    color: "#1F1F1F",
    fontSize: 18,
    lineHeight: 20,
    fontFamily: "Roboto-medium",
    fontWeight: 500,
    textAlign: "center",
    marginVertical: "auto",
  },
});
