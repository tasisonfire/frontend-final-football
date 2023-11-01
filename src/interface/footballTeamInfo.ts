import { IResponse } from "@/utils/handleResponse";

export interface IGetTeamInfo extends IResponse {
  status: number | undefined;
  data?: TeamInfo;
}

export interface TeamInfo {
  team: TeamDetail;
}

export interface TeamDetail {
  twitter: string;
  website: string;
  address: string;
  name: string;
  postcode: string;
  ground: string;
  id: number;
  capacity: number;
}
