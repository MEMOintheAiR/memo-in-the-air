import { ViroARScene, ViroARSceneNavigator } from "@reactvision/react-viro";
import { View } from "react-native";

function vrInit() {
  return <ViroARScene />;
}

export default function Index() {
  return (
    <>
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: vrInit,
        }}
        style={{ flex: 1 }}
      />
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </>
  );
}
