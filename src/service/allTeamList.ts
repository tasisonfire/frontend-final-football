import axios from "axios";
import {
  FOOTBALL_API_HOST,
  FOOTBALL_API_KEY,
  FOOTBALL_URL,
} from "@/utils/constant";
import { teams } from "@/utils/optionList";
import { handleResponse } from "@/utils/handleResponse";
import { IGetFootballTeamsList } from "@/interface/footballTeamsList";

export const footballTeamsServices = {
  getFootballTeamsList: async (
    compId: number = 0
  ): Promise<IGetFootballTeamsList> => {
    const option = {
      method: "GET",
      params: { comp: compId },
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": FOOTBALL_API_HOST,
      },
    };
    try {
      const response = await axios.get(`${FOOTBALL_URL}${teams}`, option);
      return handleResponse.success(response);
    } catch (error: any) {
      return handleResponse.error(error);
    }
  },
};
