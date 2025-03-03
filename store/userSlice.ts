import { StateCreator } from "zustand";

type userInfoType = {
  userId: string;
  authId: string;
  email: string | null;
  nickName: string | null;
  loginType: string | null;
};

type locationType = {
  latitude: number;
  longitude: number;
  altitude: number;
};

export interface UserSlice {
  userId: string;
  setUserId: (userId: string | Promise<string>) => void;
  userInfo: userInfoType;
  setUserInfo: (userInfo: userInfoType) => void;
  userLocation: locationType;
  setUserLocation: (userLocation: locationType) => void;
  differenceCoords: locationType;
  setDifferenceCoords: (differenceCoords: locationType) => void;
  isUserSetLocation: boolean;
  setIsUserSetLocation: (isUserSetLocation: boolean) => void;
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
  userInfo: {
    userId: "",
    authId: "",
    email: null,
    nickName: null,
    loginType: null,
  },
  setUserInfo: (userInfo: userInfoType) => {
    set((state: UserSlice) => ({ ...state.userInfo, userInfo }));
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
  isUserSetLocation: false,
  setIsUserSetLocation: (isUserSetLocation: boolean) => {
    set({ isUserSetLocation });
  },
});
