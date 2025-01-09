import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type AlertModalProps = {
  isModalVisible: boolean;
  alertMessage: string;
  buttonMessage: string;
  buttonFunc: () => void;
};

export default function AlertModal({
  isModalVisible,
  alertMessage,
  buttonMessage,
  buttonFunc,
}: AlertModalProps) {
  return (
    <Modal visible={isModalVisible} transparent={true} animationType="none">
      <View style={styles.modalBackgroundContainer} />
      <Modal visible={true} transparent={true} animationType="none">
        <View style={styles.modalContainer}>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalText}>{alertMessage}</Text>
          </View>
          <Pressable style={styles.modalButtonContainer} onPress={buttonFunc}>
            <Text style={styles.modalButtonText}>{buttonMessage}</Text>
          </Pressable>
        </View>
      </Modal>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackgroundContainer: {
    flex: 1,
    backgroundColor: "#737373",
    opacity: 0.9,
  },
  modalContainer: {
    width: "80%",
    height: "22%",
    margin: "auto",
    backgroundColor: "white",
  },
  modalTextContainer: {
    flex: 5,
    textAlign: "center",
    fontFamily: "SUITE-Regular",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 23,
    color: "#343A40",
  },
  modalButtonContainer: {
    flex: 2.2,
    width: "100%",
    height: 17,
    margin: "auto",
    backgroundColor: "#5E8BCE",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "SUITE-SemiBold",
    textAlign: "center",
    margin: "auto",
  },
});
