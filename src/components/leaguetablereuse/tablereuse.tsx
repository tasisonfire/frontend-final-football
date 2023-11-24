import { footballLeageTableServices } from "@/service/leagueTableList";
import { useEffect, useState } from "react";
import { Team } from "@/interface/footballTableList";

function LeagueTableReuse() {
  const [teamsData, setTeamsData] = useState<Team[] | undefined>([]);
  const [selectedTeamsValue, setSelectedTeamsValue] = useState<number>();
  const [selectedCompValue, setSelectedCompValue] = useState<number>(0);

  const favoriteCompID = localStorage.getItem("favo_comp_id");
  const favoriteTeamID = localStorage.getItem("favo_team_id");

  useEffect(() => {
    const callDataTable = async (comId: number) => {
      const responseList =
        await footballLeageTableServices.getFootballLeageTable(comId);
      setTeamsData(responseList.data?.["league-table"].teams);
    };
    callDataTable(Number(favoriteCompID));
  }, []);

  return (
    <>
      <div>
        <div>
          <h1>Table Points</h1>
          {teamsData ? (
            <table>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Played</th>
                  <th>Won</th>
                  <th>Draw</th>
                  <th>Lose</th>
                  <th>Goal For</th>
                  <th>Goal Lost</th>
                  <th>Points</th>
                </tr>
              </thead>
              {teamsData ? (
                teamsData.map((item, index) => {
                  const totalPoints =
                    (item["all-matches"]?.won || 0) * 3 +
                    (item["all-matches"]?.drawn || 0);
                  return (
                    <tbody>
                      {item.id === Number(favoriteTeamID) ? (
                        <tr
                          style={{
                            color: "red",
                            font: "bold",
                          }}
                          key={item.id}
                        >
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item["all-matches"]?.played}</td>
                          <td>{item["all-matches"]?.won}</td>
                          <td>{item["all-matches"]?.drawn}</td>
                          <td>{item["all-matches"]?.lost}</td>
                          <td>{item["all-matches"]?.for}</td>
                          <td>{item["all-matches"]?.against}</td>
                          <td>{totalPoints}</td>
                        </tr>
                      ) : (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item["all-matches"]?.played}</td>
                          <td>{item["all-matches"]?.won}</td>
                          <td>{item["all-matches"]?.drawn}</td>
                          <td>{item["all-matches"]?.lost}</td>
                          <td>{item["all-matches"]?.for}</td>
                          <td>{item["all-matches"]?.against}</td>
                          <td>{totalPoints}</td>
                        </tr>
                      )}
                    </tbody>
                  );
                })
              ) : (
                <p>Loading..</p>
              )}
            </table>
          ) : (
            <p>Please select competion</p>
          )}
        </div>
      </div>
    </>
  );
}

export default LeagueTableReuse;
