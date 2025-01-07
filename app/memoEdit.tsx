import PreviousIcon from "@/assets/images/previous.svg";
import AlertModal from "@/components/AlertModal";
import { CLOSE_BUTTON, MOVE_TO_AR_BUTTON, SUBMIT_BUTTON } from "@/constants/Buttons";
import { CREATE_MEMO_TEXT, INPUT_TEXT } from "@/constants/Messages";
import { CREATE_MEMO_PAGE } from "@/constants/Pages";
import { createMemo } from "@/firebase/memo";
import { useBoundStore } from "@/store/useBoundStore";
import { createUUID } from "@/utils/uuid";
import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function MemoEdit() {
  const userId = useBoundStore((state) => state.userId);
  const memoLocation = useBoundStore((state) => state.memoLocation);

  const [content, setContent] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [buttonMessage, setButtonMessage] = useState<string>("");

  function handleMoveToBack() {
    router.back();
  }

  function handleMoveToAR(): void {
    closeAlertModal();
    router.dismissAll();
    router.push("/loading");
  }

  function openAlertModal(isVisible: boolean, alertText: string, buttonText: string): void {
    setIsModalVisible(isVisible);
    setAlertMessage(alertText);
    setButtonMessage(buttonText);
  }

  function closeAlertModal() {
    setIsModalVisible(false);
    setAlertMessage("");
    setButtonMessage("");
  }

  async function handleClickHeaderButton(): Promise<undefined> {
    if (content === "" || content.trim() === "") {
      openAlertModal(true, INPUT_TEXT, CLOSE_BUTTON);
      return;
    }

    Keyboard.dismiss();
    const memoId = createUUID();
    await createMemo({ userId, memoId, content, ...memoLocation });

    openAlertModal(true, CREATE_MEMO_TEXT, MOVE_TO_AR_BUTTON);
  }

  function checkAlertModalFunction() {
    switch (alertMessage) {
      case INPUT_TEXT:
        return closeAlertModal();
      case CREATE_MEMO_TEXT:
        return handleMoveToAR();
      default:
        return null;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.headerButton} onPress={handleMoveToBack}>
          <PreviousIcon width="20" height="20" color="#343A40" />
        </Pressable>
        <Text style={styles.headerTitle}>{CREATE_MEMO_PAGE}</Text>
        <View style={styles.headerButton} />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={2}
          style={styles.editViewContainer}
        >
          <View style={styles.memo}>
            <TextInput
              value={content}
              onChangeText={setContent}
              style={styles.textInput}
              multiline={true}
              scrollEnabled={false}
              enterKeyHint="enter"
              textAlign="center"
              placeholder={INPUT_TEXT}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.buttonContainer} onPress={handleClickHeaderButton}>
          <Text style={styles.buttonText}>{SUBMIT_BUTTON}</Text>
        </Pressable>
      </View>

      <AlertModal
        isModalVisible={isModalVisible}
        alertMessage={alertMessage}
        buttonMessage={buttonMessage}
        buttonFunc={checkAlertModalFunction}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flex: 0.8,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  headerTitle: {
    flex: 5,
    fontSize: 24,
    fontWeight: 600,
    color: "#343A40",
    textAlign: "center",
    margin: "auto",
  },
  headerButton: {
    flex: 1,
    alignItems: "center",
    margin: "auto",
  },
  headerButtonText: {
    fontSize: 24,
    fontWeight: 400,
    color: "#6CA0DC",
    margin: "auto",
  },
  editViewContainer: {
    flex: 10,
    backgroundColor: "#f5f6f8",
  },
  memo: {
    width: 300,
    height: 300,
    backgroundColor: "#FDE44B",
    borderColor: "#343A40",
    borderWidth: 0.5,
    margin: "auto",
  },
  textInput: {
    justifyContent: "center",
    margin: "auto",
    fontSize: 23,
  },
  bottomContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#5E8BCE",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: 600,
  },
});
