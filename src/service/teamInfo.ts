import axios from "axios";
import {
  FOOTBALL_API_HOST,
  FOOTBALL_API_KEY,
  FOOTBALL_URL,
} from "@/utils/constant";
import { team } from "@/utils/optionList";
import { handleResponse } from "@/utils/handleResponse";
import { IGetTeamInfo } from "@/interface/footballTeamInfo";

export const footballTeamServices = {
  getFootballTeamInfo: async (teamId: number): Promise<IGetTeamInfo> => {
    const option = {
      method: "GET",
      params: { team: teamId },
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": FOOTBALL_API_HOST,
      },
    };
    try {
      const response = await axios.get(`${FOOTBALL_URL}${team}`, option);
      return handleResponse.success(response);
    } catch (error: any) {
      return handleResponse.error(error);
    }
  },
};
