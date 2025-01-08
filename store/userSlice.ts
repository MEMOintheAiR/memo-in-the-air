import { StateCreator } from "zustand";

type locationType = {
  latitude: number;
  longitude: number;
  altitude: number;
};

export interface UserSlice {
  userId: string;
  setUserId: (userId: string | Promise<string>) => void;
  userLocation: locationType;
  setUserLocation: (userLocation: locationType) => void;
  differenceCoords: locationType;
  setDifferenceCoords: (differenceCoords: locationType) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  userId: "",
  setUserId: async (userId: string | Promise<string>) => {
    if (typeof userId === "string") {
      set({ userId: userId });
    } else {
      set({ userId: await userId });
    }
  },
  userLocation: {
    latitude: 0,
    longitude: 0,
    altitude: 0,
  },
  setUserLocation: (userLocation: locationType) => {
    set((state: UserSlice) => ({ ...state.userLocation, userLocation }));
  },
  differenceCoords: {
    latitude: 0,
    longitude: 0,
    altitude: 0,
  },
  setDifferenceCoords: (differenceCoords: locationType) => {
    set((state: UserSlice) => ({ ...state.differenceCoords, differenceCoords }));
  },
});
