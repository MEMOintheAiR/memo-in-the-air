import { useBoundStore } from "@/store/useBoundStore";
import { router, usePathname } from "expo-router";
import { useEffect } from "react";

export default function MemoRouter() {
  const pathName = usePathname();
  const isUserSetLocation = useBoundStore((state) => state.isUserSetLocation);

  useEffect(() => {
    if (pathName === "/memoCreate") {
      if (isUserSetLocation) {
        router.push("/arWebview");
      } else {
        router.push("/setUserLocation");
      }
    }
  }, [pathName]);

  return null;
}
