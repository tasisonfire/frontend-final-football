import { IResponse } from "@/utils/handleResponse";

export interface IGetFootballTeamsList extends IResponse {
  status: number | undefined;
  data?: IGetTeams;
}

export interface IGetTeams {
  teams: Teams[];
}

export interface Teams {
  id: number;
  "full-name": string;
  "short-name": string;
}
