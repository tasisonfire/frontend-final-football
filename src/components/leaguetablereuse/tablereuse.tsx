import { footballLeageTableServices } from "@/service/leagueTableList";
import { useEffect, useState } from "react";
import { Team } from "@/interface/footballTableList";
import { leagueTableStyle } from "@/utils/leagueTableStyle";

import "./styles.css";

function LeagueTableReuse() {
  const [teamsData, setTeamsData] = useState<Team[] | undefined>([]);
  const [selectedTeamsValue, setSelectedTeamsValue] = useState<number>();
  const [selectedCompValue, setSelectedCompValue] = useState<number>(0);
  const [leagueName, setLeagueName] = useState<unknown>("");

  const favoriteCompID = localStorage.getItem("favo_comp_id");
  const favoriteTeamID = localStorage.getItem("favo_team_id");

  useEffect(() => {
    const callDataTable = async (comId: number) => {
      const responseList =
        await footballLeageTableServices.getFootballLeageTable(comId);
      setTeamsData(responseList.data?.["league-table"].teams);
      setLeagueName(responseList.data?.["league-table"].competition.name);
    };
    callDataTable(Number(favoriteCompID));
  }, []);

  const tableHeaderStyle = () => {
    if (leagueName === "Premier League") {
      return (
        <>
          <div
            className="table-header-league"
            style={{
              backgroundImage:
                leagueTableStyle.englishpremiere.style["background-image"],
            }}
          >
            <span>{String(leagueName).toUpperCase()}</span>
            <div className="competition-logo">
              <img src={leagueTableStyle.englishpremiere.logo} alt="" />
            </div>
          </div>
        </>
      );
    }
    if (leagueName === "German Bundesliga") {
      return (
        <>
          <div
            className="table-header-league"
            style={{
              backgroundImage:
                leagueTableStyle.germany.style["background-image"],
              backgroundColor:
                leagueTableStyle.germany.style["background-color"],
            }}
          >
            <span>{String(leagueName).toUpperCase()}</span>
            <div className="competition-logo">
              <img src={leagueTableStyle.germany.logo} alt="" />
            </div>
          </div>
        </>
      );
    }
    if (leagueName === "Italian Serie A") {
      return (
        <>
          <div
            className="table-header-league"
            style={{
              backgroundImage:
                leagueTableStyle.seriea.style["background-image"],
            }}
          >
            <span>{String(leagueName).toUpperCase()}</span>
            <div className="competition-logo">
              <img src={leagueTableStyle.seriea.logo} alt="" />
            </div>
          </div>
        </>
      );
    }
    if (leagueName === "Spanish La Liga") {
      return (
        <>
          <div
            className="table-header-league"
            style={{
              backgroundImage: leagueTableStyle.spain.style["background-image"],
              backgroundColor: leagueTableStyle.spain.style["background-color"],
            }}
          >
            <span>{String(leagueName).toUpperCase()}</span>
            <div className="competition-logo">
              <img src={leagueTableStyle.spain.logo} alt="" />
            </div>
          </div>
        </>
      );
    }

    if (leagueName) {
      return (
        <>
          <div
            className="table-header-league"
            style={{
              backgroundColor:
                leagueTableStyle.default.style["background-color"],
              backgroundImage:
                leagueTableStyle.default.style["background-image"],
              backgroundAttachment:
                leagueTableStyle.default.style["background-attachment"],
            }}
          >
            <span>{String(leagueName).toUpperCase()}</span>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div>
        <div className="home-table-container">
          {/* <h1>Table Points</h1> */}
          {tableHeaderStyle()}
          {teamsData ? (
            <table className="home-table">
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
                    <>
                      {item.id === Number(favoriteTeamID) ? (
                        <tr key={item.id}>
                          <td id="favostanding">{index + 1}</td>
                          <td id="favostanding">{item.name}</td>
                          <td id="favostanding">
                            {item["all-matches"]?.played}
                          </td>
                          <td id="favostanding">{item["all-matches"]?.won}</td>
                          <td id="favostanding">
                            {item["all-matches"]?.drawn}
                          </td>
                          <td id="favostanding">{item["all-matches"]?.lost}</td>
                          <td id="favostanding">{item["all-matches"]?.for}</td>
                          <td id="favostanding">
                            {item["all-matches"]?.against}
                          </td>
                          <td id="favostanding">{totalPoints}</td>
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
                          <td>{item["total-points"]}</td>
                          {/* <td>{totalPoints}</td> */}
                        </tr>
                      )}
                    </>
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
