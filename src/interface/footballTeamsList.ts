import { IResponse } from "@/utils/handleResponse";

export interface IGetFootballTeamsList extends IResponse {
  status: number | undefined;
  data?: Root;
}

export interface Root {
  teams: Team[];
}

export interface Team {
  id: number;
  "full-name": string;
  "short-name": string;
}
