import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "메모 목록",
        }}
      />
      <Tabs.Screen
        name="memoCreate"
        options={{
          title: "메모 등록",
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
