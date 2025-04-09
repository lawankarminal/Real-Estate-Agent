import { create } from "zustand";

const useFilterStore = create((set) => ({
  filters: {
    propertiesInPune: false,
    residentialProperties: false,
    rentalProperties: false,
    underConstruction: false,
    readyToMove: false,
    withBalcony: false,
    bhk3: false,
    verified: false,
    bhk2: false,
  },
  budget: 0,
  budgetDisplay: "0",

  toggleFilter: (filterName) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: !state.filters[filterName],
      },
    })),

  clearFilters: () =>
    set({
      filters: {
        propertiesInPune: false,
        residentialProperties: false,
        rentalProperties: false,
        underConstruction: false,
        readyToMove: false,
        withBalcony: false,
        bhk3: false,
        verified: false,
        bhk2: false,
      },
    }),

  setBudget: (value) =>
    set((state) => {
      let budgetDisplay;

      if (value === 0) {
        budgetDisplay = "0";
      } else if (value < 100) {
        budgetDisplay = `${value} Lakhs`; // ✅ Display Lakhs up to 1 Cr
      } else {
        budgetDisplay = `${(value / 100).toFixed(2)} Crores`; // ✅ Convert to Crores above 1 Cr
      }

      return {
        ...state,
        budget: value > 5000 ? 5000 : value, // ✅ Cap at 50 Cr (5000 Lakhs)
        budgetDisplay,
      };
    }),
}));

export default useFilterStore;
