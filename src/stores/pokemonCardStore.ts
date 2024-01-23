import { DEFAULT_PAGE_SIZE } from "@/constants/pokemonCard";
import { IPokemonCardQuery } from "@/interfaces/pokemonCard";
import { create } from "zustand";

interface PokemonCardState {
  pokemonCardQuery: IPokemonCardQuery;
  setQuery: (pokemonCardQuery: IPokemonCardQuery) => void;
}

export const usePokemonCardStore = create<PokemonCardState>((set) => ({
  pokemonCardQuery: {
    queryObject: {
      name: "",
      rarity: "",
      ["set.name"]: "",
      types: "",
    },
    q: "",
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  setQuery: (pokemonCardQuery: IPokemonCardQuery) => {
    set((state) => {
      return {
        ...state,
        pokemonCardQuery,
      };
    });
  },
}));
