import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type FilterStore = {
  category: string;
  sortField: string;
  order: string;
  setCategory: (category: string) => void;
  setSortField: (sortField: string) => void;
  setOrder: (order: string) => void;
  resetCategory: () => void;
};

export const useFilterStore = create(
  immer<FilterStore>((set) => ({
    category: "",
    sortField: "",
    order: "asc",
    setSortField: (sortField: string) =>
      set((state) => {
        state.sortField = sortField;
      }),
    setCategory: (category: string) =>
      set((state) => {
        state.category = category;
      }),
    setOrder: (order: string) =>
      set((state) => {
        state.order = order;
      }),
    resetCategory: () =>
      set((state) => {
        state.category = "";
      }),
  })),
);
