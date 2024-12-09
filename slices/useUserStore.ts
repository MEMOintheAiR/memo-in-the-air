import { StateCreator } from "zustand";

export interface UserSlice {
  userId: string;
  setUserId: (userId: string | Promise<string>) => void;
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
});
