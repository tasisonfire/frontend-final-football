import axios from "axios";
import {
  FOOTBALL_API_HOST,
  FOOTBALL_API_KEY,
  FOOTBALL_URL,
} from "@/utils/constant";
import { competitions } from "@/utils/optionList";
import { handleResponse } from "@/utils/handleResponse";
import { IGetFootballCompList } from "@/interface/footballCompList";

const footballCompList = {
  method: "GET",
  url: FOOTBALL_URL + competitions,
  params: { include: "rounds" },
  headers: {
    "X-RapidAPI-Key": FOOTBALL_API_KEY,
    "X-RapidAPI-Host": FOOTBALL_API_HOST,
  },
};

export const footballCompServices = {
  getFootballCompList: async (): Promise<IGetFootballCompList> => {
    try {
      const response = await axios.request(footballCompList);
      return handleResponse.success(response);
    } catch (error: any) {
      return handleResponse.error(error);
    }
  },
};

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FOOTBALL_API_HOST,
//   FOOTBALL_API_KEY,
//   FOOTBALL_URL,
// } from "@/utils/constant";
// import { competitions } from "@/utils/optionList";

// interface Item {
//   "generic-name": string;
//   id: number;
//   type: string;
// }

// const FootballCompList: React.FC = () => {
//   const [items, setItems] = useState<Item[]>([]);

//   const footballCompList = {
//     method: "GET",
//     url: FOOTBALL_URL + competitions,
//     params: { include: "rounds" },
//     headers: {
//       "X-RapidAPI-Key": FOOTBALL_API_KEY,
//       "X-RapidAPI-Host": FOOTBALL_API_HOST,
//     },
//   };

//   useEffect(() => {
//     // Fetch data when the component mounts
//     axios
//       .request(footballCompList) // Replace with your API endpoint
//       .then((response) => {
//         // console.log(response.data.competitions);
//         setItems(response.data.competitions);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Items List</h1>
//       <ul>
//         {items.map((item) => (
//           <li key={item.id}>{item["generic-name"]}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FootballCompList;
