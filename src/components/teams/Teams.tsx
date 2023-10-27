import React from "react";
import { callDataTeams } from "@/components/teams/TeamsHook";

interface TeamsProps {
  compid: {
    compId: number;
  };
}

function Teams({ compid }: TeamsProps) {
  console.log(compid);
  const teamData = callDataTeams(compid.compId).teams;
  //   console.log(teamData);
  return (
    <>
      {teamData && teamData.length > 0 ? (
        <ul style={{ listStyle: "none" }}>
          {teamData.map((item) => (
            <li key={item.id} value={item.id}>
              {item["full-name"]}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading..</p>
      )}
    </>
  );
}

export default Teams;
