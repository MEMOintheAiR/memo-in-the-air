import { StateCreator } from "zustand";

type locationType = {
  latitude: number;
  longitude: number;
  altitude: number;
};

type memoType = {
  [key: string]: memoIntoType;
};

type memoIntoType = {
  latitude: string;
  longitude: string;
  altitude: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export interface MemoSlice {
  memoList: memoType[];
  setMemoList: (memoList: memoType[] | Promise<memoType[]>) => void;
  memoLocation: locationType;
  setMemoLocation: ({ latitude, longitude, altitude }: locationType) => void;
}

export const createMemoSlice: StateCreator<MemoSlice> = (set) => ({
  memoList: [],
  setMemoList: async (memoList: memoType[] | Promise<memoType[]>) => {
    set({ memoList: await memoList });
  },
  memoLocation: {
    latitude: 0,
    longitude: 0,
    altitude: 0,
  },
  setMemoLocation: (memoLocation) => {
    set((state: MemoSlice) => ({ ...state.memoLocation, memoLocation }));
  },
});
