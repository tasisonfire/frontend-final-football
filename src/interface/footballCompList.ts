import { IResponse } from "@/utils/handleResponse";

export interface IGetFootballCompList extends IResponse {
  status: number | undefined;
  data?: IGetCompetitions;
}

export interface IGetCompetitions {
  competitions: Competition[];
}

export interface Competition {
  "generic-name": string;
  id: number;
  type: string;
  "full-name": string;
  rounds?: Round[];
}

export interface Round {
  name: string;
  id: number;
}
