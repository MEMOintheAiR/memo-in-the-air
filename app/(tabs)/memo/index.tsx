import LocationSetting from "./locationSetting";
import MemoView from "./view";
import { useBoundStore } from "@/store/useBoundStore";

export default function MemoIndex() {
  const isUserSetLocation = useBoundStore((state) => state.isUserSetLocation);

  return isUserSetLocation ? <MemoView /> : <LocationSetting />;
}
