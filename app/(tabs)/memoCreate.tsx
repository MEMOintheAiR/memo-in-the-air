import ARWebView from "../arWebview";
import SetUserLocation from "../setUserLocation";
import { useBoundStore } from "@/store/useBoundStore";

export default function MemoCreate() {
  const isUserSetLocation = useBoundStore((state) => state.isUserSetLocation);

  return isUserSetLocation ? <ARWebView /> : <SetUserLocation />;
}
