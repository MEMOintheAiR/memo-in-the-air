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
    opacity: 0.85,
  },
  modalContainer: {
    width: "75%",
    height: "20%",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: 7,
  },
  modalTextContainer: {
    flex: 5,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 23,
    color: "#343A40",
  },
  modalButtonContainer: {
    flex: 2,
    width: "80%",
    margin: "auto",
    marginBottom: 15,
    borderRadius: 40,
    backgroundColor: "#5E8BCE",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: 500,
    textAlign: "center",
    margin: "auto",
  },
});
