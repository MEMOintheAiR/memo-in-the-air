import PreviousIcon from "@/assets/images/previous.svg";
import EditStyleButton from "@/components/EditStyleButton";
import { DONE_BUTTON, SUBMIT_BUTTON } from "@/constants/Buttons";
import { COLOR, RESIZE, SHAPE, TEXT } from "@/constants/EditStyle";
import { INPUT_TEXT } from "@/constants/Messages";
import { CREATE_MEMO_PAGE, INPUT_TEXT_TAB } from "@/constants/Pages";
import { createMemo } from "@/firebase/memo";
import { useBoundStore } from "@/slices";
import { createUUID } from "@/utils/uuid";
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

  const [title, setTitle] = useState<string>(CREATE_MEMO_PAGE);
  const [content, setContent] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>(SUBMIT_BUTTON);
  const [placeHolder, setPlaceHolder] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false);

  async function handleClickHeaderButton(): Promise<undefined> {
    switch (buttonText) {
      case DONE_BUTTON: {
        setIsEditable(false);
        setTitle(CREATE_MEMO_PAGE);
        setPlaceHolder("");
        setButtonText(SUBMIT_BUTTON);
        Keyboard.dismiss();
        return;
      }

      case SUBMIT_BUTTON: {
        const memoId = createUUID();
        await createMemo(userId, memoId, content);
        return;
      }
    }
  }

  function handleClickTextButton(): void {
    setIsEditable(true);
    setTitle(INPUT_TEXT_TAB);
    setPlaceHolder(INPUT_TEXT);
    setButtonText(DONE_BUTTON);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <Pressable style={styles.headerButton}>
          <PreviousIcon width="20" height="20" color="#343A40" />
        </Pressable>
        <Text style={styles.headerTitle}>{title}</Text>
        <Pressable style={styles.headerButton} onPress={handleClickHeaderButton}>
          <Text style={styles.headerButtonText}>{buttonText}</Text>
        </Pressable>
      </SafeAreaView>

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
              editable={isEditable}
              enterKeyHint="enter"
              textAlign="center"
              placeholder={placeHolder}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <View style={styles.editTabContainer}>
        <EditStyleButton
          text={TEXT}
          imageName={require("../assets/images/text.png")}
          onPressFunc={handleClickTextButton}
        />
        <EditStyleButton text={SHAPE} imageName={require("../assets/images/shape.png")} />
        <EditStyleButton text={COLOR} imageName={require("../assets/images/colorPicker.png")} />
        <EditStyleButton text={RESIZE} imageName={require("../assets/images/resize.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.65,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  headerTitle: {
    flex: 5,
    fontSize: 24,
    fontWeight: 600,
    color: "#343A40",
    textAlign: "center",
    paddingBottom: 10,
  },
  headerButton: {
    flex: 1,
    alignItems: "center",
    margin: "auto",
  },
  headerButtonText: {
    fontSize: 23,
    fontWeight: 400,
    color: "#6CA0DC",
  },
  editViewContainer: {
    flex: 8,
    backgroundColor: "#E5E8E8",
  },
  memo: {
    width: 300,
    height: 300,
    backgroundColor: "#F9E79F",
    borderColor: "#000000",
    borderWidth: 0.5,
    margin: "auto",
  },
  textInput: {
    justifyContent: "center",
    margin: "auto",
    fontSize: 23,
  },
  editTabContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 25,
    backgroundColor: "#FFFFFF",
  },
});
