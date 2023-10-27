import { IGetCompetitions } from "@/interface/footballCompList";
import { create } from "zustand";

const initCompetitionStore = {
  competitions: [],
};

type UseCompetitionsListStoreType = {
  competitions: IGetCompetitions;
  setCompetitionsStore: (value: IGetCompetitions) => void;
  clearCompetitions: () => void;
};

export const useCompetitionsListStore = create<UseCompetitionsListStoreType>(
  (set) => ({
    competitions: {} as IGetCompetitions,
    setCompetitionsStore: (value: IGetCompetitions) =>
      set({ competitions: value }),
    clearCompetitions: () => set({ competitions: {} as IGetCompetitions }),
  })
);

// const initStore = {
//   competitions: {
//     competitions: [],
//   },
//   fetchCompetitions: {
//     competitions: [],
//   },
// };

// type competitionsType = {
//   competitions: Competition[];
// };

// type UseCompetitionsListStoreType = {
//   competitions: competitionsType;
//   fetchCompetitions: competitionsType;
//   setCompetitionsStore: (value: competitionsType) => void;
//   setFetchCompetitionsStoreList: (value: competitionsType) => void;
//   clearCompetitions: () => void;
// };

// export const useCompetitionsListStore = create<UseCompetitionsListStoreType>(
//   (set) => ({
//     ...initStore,
//     setCompetitionsStore: (value: competitionsType) =>
//       set({ competitions: value }),
//     setFetchCompetitionsStoreList: (value: competitionsType) =>
//       set({ fetchCompetitions: value }),
//     clearCompetitions: () => set(initStore),
//   })
// );

// type pokemonType = {
//   data: IPokemonDetailResponse[];
//   loading: boolean;
//   error: null | any;
// };

// type UsePokemonListStoreType = {
//   pokemon: pokemonType;
//   fetchPokemon: pokemonType;
//   setPokemonStore: (value: pokemonType) => void;
//   setFetchPokemonList: (value: pokemonType) => void;
//   clearPokemon: () => void;
// };

// export const usePokemonListStore = create<UsePokemonListStoreType>((set) => ({
//   ...initStore,
//   setPokemonStore: (value: pokemonType) => set({ pokemon: value }),
//   setFetchPokemonList: (value: pokemonType) => set({ fetchPokemon: value }),
//   clearPokemon: () => set({ ...initStore }),
// }));
