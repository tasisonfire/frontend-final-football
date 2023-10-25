"use client";

import { footballCompServices } from "@/service/allCompList";
import { footballTeamsServices } from "@/service/allTeamList";
import "./styles.css";
import CompetionHook from "@/components/CompetionHook";

// const callDataComp = async () => {
//   const responseList = await footballCompServices.getFootballCompList();
//   console.log(responseList.status);
//   // console.log(responseList.data?.competitions);
// };
// const callDataTeams = async () => {
//   const responseList = await footballTeamsServices.getFootballTeamsList(2);
//   console.log(responseList.data?.teams);
// };

function index() {
  return (
    <>
      <div>
        <h1 className="index-header">home</h1>
        <div className="comp-container">
          <div className="comp-list">{/* <CompetionHook /> */}</div>
        </div>
      </div>
    </>
  );
}

export default index;
