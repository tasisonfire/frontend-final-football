import { useEffect, useState } from "react";
import { callDataComp } from "@/components/competition/CompetionHook";
import { callDataTeams } from "../teams/TeamsHook";
import { footballTeamsServices } from "@/service/allTeamList";
import { Team } from "@/interface/footballTeamsList";

function Competion() {
  const [selectedCompValue, setSelectedCompValue] = useState();
  const [selectedTeamsValue, setSelectedTeamsValue] = useState();
  const [teamList, setTeamsList] = useState<Team[] | undefined>([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const compData = callDataComp().competitions;
  // const teamList = callDataTeams(selectedCompValue).teams;
  // console.log(compData);

  const handleSelectChangeComp = (event: any) => {
    const selectedOption = event.target.value;
    // console.log(selectedOption);
    setSelectedCompValue(selectedOption);
  };

  useEffect(() => {
    if (selectedCompValue) {
      const fetchTeamData = async () => {
        // const teamList = await callDataTeams(selectedCompValue);
        setTeamLoading(true);
        const teamList = await footballTeamsServices.getFootballTeamsList(
          selectedCompValue
        );
        console.log("api fetch teams status:", teamList.status);

        // console.log(teamList.data?.teams);
        setTeamsList(teamList.data?.teams);
      };
      fetchTeamData();
    }
  }, [selectedCompValue]);

  const handleSelectChangeTeam = (event: any) => {
    const selectedOption = event.target.value;
    console.log(selectedOption);
    setSelectedTeamsValue(selectedTeamsValue);
  };

  return (
    <>
      <section>
        {compData && compData.length > 0 ? (
          <form action="#">
            <label>Comptetitions</label>

            <select
              name="competitions"
              id="comp"
              value={selectedCompValue}
              onChange={handleSelectChangeComp}
            >
              <option value="">Select Competition</option>
              {compData
                .filter((type) => type.type === "league")
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item["generic-name"]}
                  </option>
                ))}
            </select>
            {/* <input type="submit" value="Submit" /> */}
          </form>
        ) : (
          <p>loading..</p>
        )}
      </section>
      <section>
        {teamList && teamList.length > 0 ? (
          <form action="">
            <label htmlFor="teams">Teams</label>

            <select
              name="teams"
              id="teams"
              value={selectedTeamsValue}
              onChange={handleSelectChangeTeam}
            >
              <option value="">Select Team</option>

              {teamList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item["full-name"]}
                </option>
              ))}
            </select>
          </form>
        ) : teamLoading ? (
          <p>Loading teams data..</p>
        ) : (
          <p>Select competition first..</p>
        )}
      </section>
    </>
  );
}

//   return (
//     <>
//       {compData && compData.length > 0 ? (
//         <ul style={{ listStyle: "none" }}>
//           {compData
//             .filter((type) => type.type === "league")
//             .map((item) => (
//               <li key={item.id} value={item.id}>
//                 {item["generic-name"]}
//               </li>
//             ))}
//         </ul>
//       ) : (
//         <p>Loading..</p>
//       )}
//     </>
//   );
// }

export default Competion;

// {
//   /* <>
// {compData && compData.length > 0 ? (
//   <ul style={{ listStyle: "none" }}>
//     {compData
//       .filter((type) => type.type === "league")
//       .map((item) => (
//         <li key={item.id} value={item.id}>
//           {item["generic-name"]}
//         </li>
//       ))}
//   </ul>
// ) : (
//   <p>Loading..</p>
// )}
// </> */
// }
