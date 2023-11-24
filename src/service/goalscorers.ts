import axios from "axios";
import {
  FOOTBALL_API_HOST,
  FOOTBALL_API_KEY,
  FOOTBALL_URL,
} from "@/utils/constant";
import { handleResponse } from "@/utils/handleResponse";
import { goalscorers } from "@/utils/optionList";
import { IGetGoalScorers } from "@/interface/footballGoalScorers";

export const footballGoalScorers = {
  getFootballGoalScorers: async (
    compId: number,
    teamId: number
  ): Promise<IGetGoalScorers> => {
    const option = {
      method: "GET",
      params: { comp: compId, team: teamId },
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": FOOTBALL_API_HOST,
      },
    };
    try {
      const response = await axios.get(`${FOOTBALL_URL}${goalscorers}`, option);
      return handleResponse.success(response);
    } catch (error: any) {
      return handleResponse.error(error);
    }
  },
};
