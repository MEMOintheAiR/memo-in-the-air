import { UserSlice, createUserSlice } from "./userSlice";
import { create } from "zustand";

const useBoundStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}));

export { useBoundStore };
