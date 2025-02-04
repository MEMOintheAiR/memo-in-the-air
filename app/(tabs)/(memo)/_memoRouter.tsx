import { router } from "expo-router";
import { useEffect } from "react";

export default function MemoRouter() {
  useEffect(() => {
    router.push("/setUserLocation");
  });

  return null;
}
