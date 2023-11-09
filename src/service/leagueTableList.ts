import axios from "axios";
import {
  FOOTBALL_API_HOST,
  FOOTBALL_API_KEY,
  FOOTBALL_URL,
} from "@/utils/constant";
import { leaguetable } from "@/utils/optionList";
import { handleResponse } from "@/utils/handleResponse";
import { IGetFootballTeamsList } from "@/interface/footballTableList";

export const footballLeageTableServices = {
  getFootballLeageTable: async (
    compId: number
  ): Promise<IGetFootballTeamsList> => {
    const option = {
      method: "GET",
      url: FOOTBALL_URL + leaguetable,
      params: { comp: compId },
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": FOOTBALL_API_HOST,
      },
    };
    try {
      const response = await axios.get(`${FOOTBALL_URL}${leaguetable}`, option);
      return handleResponse.success(response);
    } catch (error: any) {
      console.log(error);
      return handleResponse.error(error);
    }
  },
};

// const footballCompList = {
//   method: "GET",
//   url: FOOTBALL_URL + leaguetable,
//   params: { comp: "1" },
//   headers: {
//     "X-RapidAPI-Key": FOOTBALL_API_KEY,
//     "X-RapidAPI-Host": FOOTBALL_API_HOST,
//   },
// };

// export const footballCompServices = {
//   getFootballCompList: async (): Promise<IGetFootballCompList> => {
//     try {
//       const response = await axios.request(footballCompList);
//       return handleResponse.success(response);
//     } catch (error: any) {
//       return handleResponse.error(error);
//     }
//   },
// };

// const options = {
//   method: "GET",
//   url: "https://football-web-pages1.p.rapidapi.com/league-table.json",
//   params: { comp: "1" },
//   headers: {
//     "X-RapidAPI-Key": "a8e962d592msh901207ff4b67fb2p17b40cjsnebe727d83ecb",
//     "X-RapidAPI-Host": "football-web-pages1.p.rapidapi.com",
//   },
// };

// try {
//   const response = await axios.request(options);
//   console.log(response.data);
// } catch (error) {
//   console.error(error);
// }
