import axios from "axios";
import {
  FOOTBALL_API_HOST,
  FOOTBALL_API_KEY,
  FOOTBALL_COMP_URL,
} from "@/utils/constant";
import { IRoot, Competition } from "@/interface/footballCompList";

const footballCompListServices = {
  getFootballCompList: async (): Promise<any> => {
    const response = await axios.get(FOOTBALL_COMP_URL, {
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": FOOTBALL_API_HOST,
      },
      params: {
        include: "round",
      },
    });
    return response;
  },
};
