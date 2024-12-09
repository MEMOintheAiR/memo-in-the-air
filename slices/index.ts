import { UserSlice, createUserSlice } from "./useUserStore";
import { create } from "zustand";

const useBoundStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}));

export { useBoundStore };
