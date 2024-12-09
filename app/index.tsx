import Home from "./home";
import { useBoundStore } from "@/slices";
import { checkUserId } from "@/utils/uuid";
import { useEffect } from "react";

export default function Index() {
  const setUserId = useBoundStore((state) => state.setUserId);

  useEffect(() => {
    const userId: Promise<string> = checkUserId();
    setUserId(userId);
  }, []);

  return <Home />;
}
