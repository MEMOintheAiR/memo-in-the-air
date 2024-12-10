import { StateCreator } from "zustand";

type locationType = {
  latitude: number;
  longitude: number;
  altitude: number | null;
};

export interface MemoSlice {
  memoLocation: locationType;
  setMemoLocation: ({ latitude, longitude, altitude }: locationType) => void;
}

export const createMemoSlice: StateCreator<MemoSlice> = (set) => ({
  memoLocation: {
    latitude: 0,
    longitude: 0,
    altitude: 0,
  },
  setMemoLocation: (memoLocation) => {
    set((state: MemoSlice) => ({ ...state.memoLocation, memoLocation }));
  },
});
