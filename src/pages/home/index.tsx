"use client";
// import { footballCompServices } from "@/service/allCompList";
// import { footballTeamsServices } from "@/service/allTeamList";
// import footballTeamServices from "@/service/teamInfo";
// import Competions from "@/components/competition/Competion";
// import Teams from "@/components/teams/Teams";
// import { footballGoalScorers } from "@/service/goalscorers";

import "./styles.css";
import { useEffect, useState } from "react";
import Favoriteteam from "@/components/favoriteteam/Favoriteteam";
import FixtureReuse from "@/components/fixtureresultreuseable/fixturereuse";
import { footballGoalScorers } from "@/service/goalscorers";
import { Player } from "@/interface/footballGoalScorers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeagueTableReuse from "@/components/leaguetablereuse/tablereuse";
import TeamInfoReuse from "@/components/teaminforeuse/teaminforeuse";

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

// const callDataGoalScorers = async () => {
//   const responseList = await footballGoalScorers.getFootballGoalScorers(0, 13);
//   console.log(responseList.data?.goalscorers);
// };

// const callDataTeamInfo = async () => {
//   const responseList = await footballTeamServices.getFootballTeamInfo(13);
//   console.log(responseList.data?.team);
// };

const favoriteTeamID = localStorage.getItem("favo_team_id");
const favoriteCompID = localStorage.getItem("favo_comp_id");

function index() {
  const [goalScorersData, setGoalScorers] = useState<Player[]>();

  if (favoriteTeamID) {
    useEffect(() => {
      const callGoalScorersData = async () => {
        const responseList = await footballGoalScorers.getFootballGoalScorers(
          Number(favoriteCompID),
          Number(favoriteTeamID)
        );
        console.log(responseList.status);
        // console.log(responseList.data?.goalscorers.players);
        setGoalScorers(responseList.data?.goalscorers.players);
        // console.log(goalScorers);
      };
      callGoalScorersData();
    }, []);
  }

  return (
    <>
      <div>
        {/* <h1 className="index-header">home</h1> */}
        <div className="content-container">
          <div className="comp-list">
            {/* <Teams compid={{ compId: 1 }} /> */}
            <Favoriteteam />
            {favoriteCompID || favoriteTeamID ? (
              <div>
                {/* <FixtureReuse /> */}
                <LeagueTableReuse />
              </div>
            ) : (
              <p></p>
            )}
            {goalScorersData ? (
              <>
                <div className="grid-2">
                  <div className="team-info-container">
                    <TeamInfoReuse />
                  </div>
                  <div className="most-goal-container">
                    <h1>Most Goalscorer</h1>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Scored</th>
                        </tr>
                      </thead>
                      <tbody>
                        {goalScorersData
                          ?.sort((a, b) =>
                            a.goals.length < b.goals.length ? 1 : -1
                          )
                          .map((item) => (
                            <tr key={item.id}>
                              <td>
                                {item["first-name"]} {item["last-name"]}
                              </td>
                              <td>{item.goals.length}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
