import AlertModal from "@/components/AlertModal";
import Header from "@/components/Header";
import ShadowButton from "@/components/ShadowButton";
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
  SafeAreaView,
  StyleSheet,
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
    router.push("/memo/view");
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
      <Header
        headerStyle={styles.headerContainer}
        headerTitle={CREATE_MEMO_PAGE}
        showPreviousButton={true}
        onPressFunc={handleMoveToBack}
      />

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
        <ShadowButton
          buttonStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
          buttonText={SUBMIT_BUTTON}
          onPressFunc={handleClickHeaderButton}
        />
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
    fontFamily: "SUITE-Medium",
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
    fontSize: 18,
    fontWeight: 400,
    color: "#5E8BCE",
    margin: "auto",
  },
  editViewContainer: {
    flex: 10,
    backgroundColor: "#F5F6F8",
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
    fontSize: 25,
    fontFamily: "SUITE-Medium",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  buttonContainer: {
    width: "85%",
    height: "80%",
    borderRadius: 10,
    marginHorizontal: "auto",
    backgroundColor: "#5E8BCE",
  },
  buttonText: {
    fontSize: 22,
    fontFamily: "SUITE-Bold",
    color: "#FFFFFF",
  },
});
