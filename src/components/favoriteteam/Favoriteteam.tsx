import { useEffect, useState } from "react";
import { callDataComp } from "@/components/competition/CompetionHook";
import { footballTeamsServices } from "@/service/allTeamList";
import { Teams } from "@/interface/footballTeamsList";
import { TeamDetail } from "@/interface/footballTeamInfo";
import { footballTeamServices } from "@/service/teamInfo";
// import { team } from "@/utils/optionList";

function Favoriteteam() {
  const [selectedCompValue, setSelectedCompValue] = useState();
  const [selectedTeamsValue, setSelectedTeamsValue] = useState<number>();
  const [teamList, setTeamsList] = useState<Teams[] | undefined>([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [favoTeam, setFavoTeam] = useState<TeamDetail[]>([]);

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

  useEffect(() => {
    const favoTeamId = localStorage.getItem("favorite team id");

    if (favoTeamId) {
      const fetchTeamDetail = async () => {
        const teamDetail = await footballTeamServices.getFootballTeamInfo(
          favoTeamId
        );

        console.log("api fetch team detail status:", teamDetail.status);
        // console.log(teamDetail);
        setFavoTeam(teamDetail.data?.team);
      };

      fetchTeamDetail();
    }
  }, []);

  const handleSelectChangeTeam = (event: any) => {
    const selectedOption = event.target.value;
    // console.log(selectedOption);
    setSelectedTeamsValue(selectedOption);
  };

  const handleFavoTeam = (event: any) => {
    event.preventDefault();
    window.location.reload();
    // const selectedOption = event.target.value;
    console.log(selectedTeamsValue);
    localStorage.setItem("favorite team id", `${selectedTeamsValue}`);
  };

  const handleCheckFavo = (event: any) => {
    event.preventDefault();
    const favoTeam = localStorage.getItem("favorite team id");
    console.log(favoTeam);
  };

  const handleRemoveFavo = (event: any) => {
    event.preventDefault();
    window.location.reload();
    localStorage.removeItem("favorite team id");
    console.log("Favorite team removed");
  };

  return (
    <>
      <div>
        {localStorage.getItem("favorite team id") ? (
          <p></p>
        ) : (
          <div>
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
                  <button onClick={handleFavoTeam}>Save Favorite Team</button>
                </form>
              ) : teamLoading ? (
                <p>Loading teams data..</p>
              ) : (
                <p>Select competition first..</p>
              )}
            </section>
          </div>
        )}
      </div>
      <section>
        {localStorage.getItem("favorite team id") ? (
          <div>
            <p>Your favorite team is</p>
            <ul style={{ listStyle: "none" }}>
              <li>{favoTeam.name}</li>
              <li>{favoTeam.id}</li>
              <li>{favoTeam.website}</li>
            </ul>
          </div>
        ) : (
          <p>No favorite team</p>
        )}
        <button onClick={handleCheckFavo}>check favo</button>
        <button onClick={handleRemoveFavo}>remove favo</button>
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

export default Favoriteteam;

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
