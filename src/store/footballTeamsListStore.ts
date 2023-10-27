import { IGetTeams } from "@/interface/footballTeamsList";
import { create } from "zustand";

const initCompetitionStore = {
  teams: [],
};

type UseTeamsListStoreType = {
  teams: IGetTeams;
  setTeamsStore: (value: IGetTeams) => void;
  clearTeams: () => void;
};

export const useTeamsListStore = create<UseTeamsListStoreType>((set) => ({
  teams: {} as IGetTeams,
  setTeamsStore: (value: IGetTeams) => set({ teams: value }),
  clearTeams: () => set({ teams: {} as IGetTeams }),
}));
