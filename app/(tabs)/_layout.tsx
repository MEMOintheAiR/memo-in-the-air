import MapMarker from "@/assets/images/mapMarker.svg";
import Memo from "@/assets/images/memo.svg";
import User from "@/assets/images/user.svg";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="memoList"
      screenOptions={{ tabBarActiveTintColor: "#5E8BCE", headerShown: false }}
    >
      <Tabs.Screen
        name="memoList"
        options={{
          title: "메모 목록",
          tabBarIcon: ({ focused }) => (
            <MapMarker width={25} height={25} color={focused ? "#5E8BCE" : "#808b96"} />
          ),
        }}
      />
      <Tabs.Screen
        name="memoCreate"
        options={{
          title: "메모 등록",
          tabBarIcon: ({ focused }) => (
            <Memo width={31} height={31} color={focused ? "#5E8BCE" : "#808b96"} />
          ),
          tabBarLabelStyle: {
            paddingTop: 1,
          },
        }}
      />
      <Tabs.Screen
        name="myPage"
        options={{
          title: "마이페이지",
          tabBarIcon: ({ focused }) => (
            <User width={31.5} height={31.5} color={focused ? "#5E8BCE" : "#808b96"} />
          ),
          tabBarLabelStyle: {
            paddingTop: 4,
          },
        }}
      />
    </Tabs>
  );
}
