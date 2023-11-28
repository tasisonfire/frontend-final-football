import axios from "axios";
import {
  FOOTBALL_API_HOST,
  FOOTBALL_API_KEY,
  FOOTBALL_URL,
} from "@/utils/constant";
import { fixture } from "@/utils/optionList";
import { handleResponse } from "@/utils/handleResponse";
import { IGetFixtureResults } from "@/interface/footballFixtureResult";

// export const footballFixtureResultServices = {
//   getFootballFixtureResult: async (
//     compId: number,
//     teamId: number = 0
//   ): Promise<IGetFixtureResults> => {
//     const option = {
//       method: "GET",
//       url: FOOTBALL_URL + fixture,
//       params: {
//         comp: compId,
//         team: teamId,
//       },
//       headers: {
//         "X-RapidAPI-Key": FOOTBALL_API_KEY,
//         "X-RapidAPI-Host": FOOTBALL_API_HOST,
//       },
//     };
//     try {
//       const response = await axios.get(`${FOOTBALL_URL}${fixture}`, option);
//       return handleResponse.success(response);
//     } catch (error: any) {
//       console.log(error);
//       return handleResponse.error(error);
//     }
//   },
// };
