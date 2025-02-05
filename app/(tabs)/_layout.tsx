import MapMarker from "@/assets/images/mapMarker.svg";
import Memo from "@/assets/images/memo.svg";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#5E8BCE", headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "메모 목록",
          tabBarIcon: ({ focused }) => (
            <MapMarker width={25} height={25} color={focused ? "#5E8BCE" : "#808b96"} />
          ),
        }}
      />
      <Tabs.Screen
        name="memoRouter"
        options={{
          title: "메모 등록",
          tabBarIcon: ({ focused }) => (
            <Memo width={30} height={30} color={focused ? "#5E8BCE" : "#808b96"} />
          ),
        }}
      />
      <Tabs.Screen
        name="(memo)"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
