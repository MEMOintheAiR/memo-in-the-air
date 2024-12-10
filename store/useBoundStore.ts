import { MemoSlice, createMemoSlice } from "./memoSlice";
import { UserSlice, createUserSlice } from "./userSlice";
import { create } from "zustand";

const useBoundStore = create<UserSlice & MemoSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createMemoSlice(...a),
}));

export { useBoundStore };
