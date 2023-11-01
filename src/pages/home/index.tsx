"use client";

import { footballCompServices } from "@/service/allCompList";
import { footballTeamsServices } from "@/service/allTeamList";
import { footballTeamServices } from "@/service/teamInfo";
import "./styles.css";
import Competions from "@/components/competition/Competion";
import Teams from "@/components/teams/Teams";
import Favoriteteam from "@/components/favoriteteam/Favoriteteam";

// const callDataComp = async () => {
//   const responseList = await footballCompServices.getFootballCompList();
//   // console.log(responseList.status);
//   // console.log(responseList.data?.competitions);
// };

// const callDataTeams = async () => {
//   const responseList = await footballTeamsServices.getFootballTeamsList(13);
//   console.log(responseList.data?.teams);
// };

// const responseList = await footballTeamServices.getFootballTeamInfo(13);
// console.log(responseList.data?.team);

function index() {
  return (
    <>
      <div>
        <h1 className="index-header">home</h1>
        <div className="comp-container">
          <div className="comp-list">
            {/* <Teams compid={{ compId: 1 }} /> */}
            {/* <Favoriteteam /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
