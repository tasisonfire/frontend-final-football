import { IGetFootballTable } from "@/interface/footballTableList";
import { create } from "zustand";

type UseTableListStoreType = {
  leagueTable: IGetFootballTable;
  setTableLeagueStore: (value: IGetFootballTable) => void;
  clearTeablLeage: () => void;
};

export const useTableLeagueListStore = create<UseTableListStoreType>((set) => ({
  leagueTable: {} as IGetFootballTable,
  setTableLeagueStore: (value: IGetFootballTable) =>
    set({ leagueTable: value }),
  clearTeablLeage: () => set({ leagueTable: {} as IGetFootballTable }),
}));
