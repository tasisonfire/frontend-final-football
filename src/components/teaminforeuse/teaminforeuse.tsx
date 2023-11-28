import { useEffect, useState } from "react";
import footballTeamServices from "@/service/teamInfo";
import { TeamDetail } from "@/interface/footballTeamInfo";

function TeamInfoReuse() {
  const [teamName, setTeamName] = useState<TeamDetail>();

  const favoriteTeamID = localStorage.getItem("favo_team_id");

  useEffect(() => {
    const callTeamDetailData = async () => {
      const responseLIst = await footballTeamServices.getFootballTeamInfo(
        Number(favoriteTeamID)
      );
      setTeamName(responseLIst.data?.team);
    };
    callTeamDetailData();
  }, []);

  return (
    <>
      {/* <p>Comp ID is {Number(parentState.selectedCompValue)}</p>
      <p>Team ID is {Number(parentState.team)}</p> */}
      <h1>Team Informations</h1>
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
    </>
  );
}

export default TeamInfoReuse;
