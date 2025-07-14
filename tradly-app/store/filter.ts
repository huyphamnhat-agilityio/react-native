import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type FilterStore = {
  category: string;
  sortField: string;
  order: string;
  searchQuery: string;
  setCategory: (category: string) => void;
  setSortField: (sortField: string) => void;
  setOrder: (order: string) => void;
  setSearchQuery: (searchQuery: string) => void;
  resetCategory: () => void;
};

export const useFilterStore = create(
  immer<FilterStore>((set) => ({
    category: "",
    sortField: "",
    order: "asc",
    searchQuery: "",
    setSearchQuery: (searchQuery: string) =>
      set((state) => {
        state.searchQuery = searchQuery;
      }),
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
