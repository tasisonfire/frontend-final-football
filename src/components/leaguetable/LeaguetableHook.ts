// import { footballLeageTableServices } from "@/service/leagueTableList";
// import { useTableLeagueListStore } from "@/store/footballTableListStore";
// import { useEffect } from "react";

// export const callDataLeageTable = (comId: number) => {
//   const { setTableLeagueStore, leagueTable } = useTableLeagueListStore();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responseList =
//           await footballLeageTableServices.getFootballLeageTable(comId);
//         // console.log(responseList.data);
//         setTableLeagueStore({
//           leagueTable: responseList.data?.["league-table"].teams,
//         });
//       } catch (error) {
//         console.log(error);
//         setTableLeagueStore({ legueTable: [] });
//       }
//     };
//     fetchData();
//   }, []);

//   return leagueTable;
// };
