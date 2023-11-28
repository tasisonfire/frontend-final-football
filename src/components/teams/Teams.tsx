import { useEffect, useState } from "react";
import { CompTeamInput } from "../compteaminput/compteaminput";
import footballTeamServices from "@/service/teamInfo";
import { TeamDetail } from "@/interface/footballTeamInfo";
import { Player } from "@/interface/footballGoalScorers";
import { footballGoalScorers } from "@/service/goalscorers";

type TParentState = {
  selectedCompValue: Number;
  team: Number;
};

function Teams() {
  const [parentState, setParentState] = useState<TParentState>({
    selectedCompValue: 0,
    team: 0,
  });
  const [teamName, setTeamName] = useState<TeamDetail>();
  const [goalScorers, setGoalScorers] = useState<Player[] | undefined>([]);

  const handleChangesCompTeam = (selectedCompValue: Number, team: Number) => {
    setParentState({
      selectedCompValue,
      team,
    });
    console.log(team);
  };

  useEffect(() => {
    const callTeamDetailData = async () => {
      const responseLIst = await footballTeamServices.getFootballTeamInfo(
        parentState.team
      );
      console.log(responseLIst.data?.team.name);
      setTeamName(responseLIst.data?.team);
    };
    callTeamDetailData();
  }, [parentState.team]);

  useEffect(() => {
    const callGoalScorersData = async () => {
      const responseList = await footballGoalScorers.getFootballGoalScorers(
        Number(parentState.selectedCompValue),
        Number(parentState.team)
      );
      // console.log(responseList.data?.goalscorers.players);
      setGoalScorers(responseList.data?.goalscorers.players);
      // console.log(goalScorers);
    };
    callGoalScorersData();
  }, [parentState.team]);

  return (
    <>
      <CompTeamInput handleChanges={handleChangesCompTeam} />
      {/* <p>Comp ID is {Number(parentState.selectedCompValue)}</p>
      <p>Team ID is {Number(parentState.team)}</p> */}
      {teamName ? (
        <div>
          <p>Team name is {teamName?.name}</p>
          <p>Address is {teamName?.address}</p>
          <p>Stadium capacity is {teamName?.capacity}</p>
          <p>Stadium name is {teamName?.ground}</p>
          <p>
            Website is <a href={teamName?.website}>{teamName?.website}</a>
          </p>
        </div>
      ) : (
        <p></p>
      )}
      <p>
        <div>
          {goalScorers ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Scored</th>
                </tr>
              </thead>
              <tbody>
                {goalScorers
                  ?.sort((a, b) => (a.goals.length < b.goals.length ? 1 : -1))
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
          ) : (
            <></>
          )}

          {/* <p>{item.goals.map((item) => item.match["home-team"].score)}</p> */}
        </div>
      </p>
    </>
  );
}

//   const [selectedCompValue, setSelectedCompValue] = useState();
//   const [teamsList, setTeamsList] = useState<any>(0);

//   const compData = callDataComp().competitions;

//   const handleSelectChangeComp = (event: any) => {
//     const selectedOption = event.target.value;
//     setSelectedCompValue(selectedOption);
//   };

//   useEffect(() => {
//     if (selectedCompValue) {
//       const fetchTeamData = async () => {
//         // const teamList = await callDataTeams(selectedCompValue);
//         // setTeamLoading(true);
//         const teamList = await footballTeamsServices.getFootballTeamsList(
//           selectedCompValue
//         );
//         console.log("api fetch teams status:", teamList.status);

//         console.log("teamlistdata: ", teamList.data?.teams);
//         setTeamsList(teamList.data?.teams);
//       };
//       fetchTeamData();
//     }
//   }, [selectedCompValue]);

//   return (
//     <>
//       <section>
//         {compData && compData.length > 0 ? (
//           <form action="#">
//             <label>Comptetitions</label>

//             <select
//               name="competitions"
//               id="comp"
//               value={selectedCompValue}
//               onChange={handleSelectChangeComp}
//             >
//               <option value="">Select Competition</option>
//               {compData
//                 .filter((type) => type.type === "league")
//                 .map((item) => (
//                   <option key={item.id} value={item.id}>
//                     {item["generic-name"]}
//                   </option>
//                 ))}
//             </select>
//             {/* <input type="submit" value="Submit" /> */}
//           </form>
//         ) : (
//           <p>loading..</p>
//         )}
//       </section>
//       <section>
//         {teamsList && teamsList.length > 0 ? (
//           <form action="">
//             <label htmlFor="teams">Teams</label>
//             <select
//               name="teams"
//               id="teams"
//               // value={selectedTeamsValue}
//               // onChange={handleSelectChangeTeam}
//             >
//               <option value="">Select Team</option>

//               {teamsList.map((item) => (
//                 <option key={item.id} value={item.id}>
//                   {item["full-name"]}
//                 </option>
//               ))}
//             </select>
//           </form>
//         ) : (
//           <p>Select competition first..</p>
//         )}
//       </section>
//     </>
//   );
// }

export default Teams;
