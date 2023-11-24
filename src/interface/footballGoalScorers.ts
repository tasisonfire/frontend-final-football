import { IResponse } from "@/utils/handleResponse";

export interface IGetGoalScorers extends IResponse {
  status: number | undefined;
  data?: GetGoalScorers;
}

export interface GetGoalScorers {
  pages: number;
  records: number;
  goalscorers: Goalscorers;
  page: number;
}

export interface Goalscorers {
  players?: Player[];
  competition: Competition2;
  team: Team;
}

export interface Player {
  id: number;
  "first-name": string;
  "last-name": string;
  goals: Goal[];
}

export interface Goal {
  match: Match;
  description: string;
  minute: number;
  "minute-extra"?: number;
}

export interface Match {
  date: string;
  competition: Competition;
  id: number;
  "home-team": HomeTeam;
  "away-team": AwayTeam;
  attendance: number;
  round?: Round;
}

export interface Competition {
  name: string;
  id: number;
}

export interface HomeTeam {
  score: number;
  name: string;
  id: number;
}

export interface AwayTeam {
  score: number;
  name: string;
  id: number;
}

export interface Round {
  name: string;
  id: number;
}

export interface Competition2 {
  name: string;
  id: number;
}

export interface Team {
  name: string;
  id: number;
}
