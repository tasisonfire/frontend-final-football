"use client";

import { footballCompServices } from "@/service/allCompList";
import { footballTeamsServices } from "@/service/allTeamList";
import "./styles.css";
import Competions from "@/components/competition/Competion";
import Teams from "@/components/teams/Teams";

// const callDataComp = async () => {
//   const responseList = await footballCompServices.getFootballCompList();
//   // console.log(responseList.status);
//   // console.log(responseList.data?.competitions);
// };

// const callDataTeams = async () => {
//   const responseList = await footballTeamsServices.getFootballTeamsList(13);
//   console.log(responseList.data?.teams);
// };

function index() {
  return (
    <>
      <div>
        <h1 className="index-header">home</h1>
        <div className="comp-container">
          <div className="comp-list">
            {/* <Teams compid={{ compId: 1 }} /> */}
            <Competions />
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
