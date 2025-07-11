import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type FilterStore = {
  category: string;
  setCategory: (category: string) => void;
  resetCategory: () => void;
};

export const useFilterStore = create(
  immer<FilterStore>((set) => ({
    category: "",
    setCategory: (category: string) =>
      set((state) => {
        state.category = category;
      }),
    resetCategory: () =>
      set((state) => {
        state.category = "";
      }),
  })),
);
