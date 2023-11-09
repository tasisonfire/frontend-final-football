import { IResponse } from "@/utils/handleResponse";

export interface IGetFootballTeamsList extends IResponse {
  status: number | undefined;
  data?: IGetFootballTable;
}

export interface IGetFootballTable {
  "league-table": LeagueTable;
}

export interface LeagueTable {
  teams: Team[];
  description: string;
  competition: Competition;
}

export interface Team {
  "all-matches"?: AllMatches;
  zone?: string;
  name?: string;
  "home-matches"?: HomeMatches;
  "away-matches"?: AwayMatches;
  id?: number;
  position?: number;
  "total-points"?: number;
}

export interface AllMatches {
  lost: number;
  against: number;
  "goal-difference": number;
  won: number;
  for: number;
  drawn: number;
  played: number;
}

export interface HomeMatches {
  lost: number;
  against: number;
  won: number;
  for: number;
  drawn: number;
  played: number;
}

export interface AwayMatches {
  lost: number;
  against: number;
  won: number;
  for: number;
  drawn: number;
  played: number;
}

export interface Competition {
  name: string;
  id: number;
}
