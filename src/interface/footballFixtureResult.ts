import { IResponse } from "@/utils/handleResponse";

export interface IGetFixtureResults extends IResponse {
  status: number | undefined;
  data?: GetFixtureResult;
}

export interface GetFixtureResult {
  "fixtures-results": FixturesResults;
}

export interface FixturesResults {
  competition: Competition;
  matches: Match[];
}

export interface Competition {
  name: string;
  id: number;
}

export interface Match {
  date: string;
  venue: string;
  competition: Competition2;
  id: number;
  time: string;
  "home-team": HomeTeam;
  referee?: string;
  "away-team": AwayTeam;
  attendance: number;
  status: Status;
}

export interface Competition2 {
  name: string;
  id: number;
}

export interface HomeTeam {
  score: number;
  "half-time-score"?: number;
  name: string;
  id: number;
  "aggregate-score"?: number;
  "penalties-score"?: number;
}

export interface AwayTeam {
  score: number;
  "half-time-score"?: number;
  name: string;
  id: number;
  "aggregate-score"?: number;
  "penalties-score"?: number;
}

export interface Status {
  short: string;
  full: string;
}
