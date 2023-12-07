import { footballLeageTableServices } from "@/service/leagueTableList";
import { useEffect, useState } from "react";
import { Team } from "@/interface/footballTableList";
import { callDataComp } from "@/components/competition/CompetionHook";
import { callDataLeageTable } from "@/components/leaguetable/LeaguetableHook";

function LeagueTable() {
  const [teamsData, setTeamsData] = useState<Team[] | undefined>([]);
  const [selectedTeamsValue, setSelectedTeamsValue] = useState<number>();
  const [selectedCompValue, setSelectedCompValue] = useState<number>(0);
  const [leagueName, setLeagueName] = useState<unknown>("");

  const compData = callDataComp().competitions;

  // if (localStorage.getItem("favo_comp_id")) {
  //   const callDataTable = async (comId: number) => {
  //     const responseList =
  //       await footballLeageTableServices.getFootballLeageTable(comId);
  //     setTeamsData(responseList.data?.["league-table"].teams);
  //   };
  //   const comIdLocalStorage = localStorage.getItem("favo_comp_id");
  //   callDataTable(comIdLocalStorage);
  // }

  useEffect(() => {
    const callDataTable = async (comId: number) => {
      const responseList =
        await footballLeageTableServices.getFootballLeageTable(comId);
      setTeamsData(responseList.data?.["league-table"].teams);
      setLeagueName(responseList.data?.["league-table"].competition.name);
    };
    callDataTable(selectedCompValue);
  }, [selectedCompValue]);

  const handleSelectChangeComp = (event: any) => {
    const selectedOption = event.target.value;
    console.log(selectedOption);
    setSelectedCompValue(selectedOption);
  };

  // console.log(teamsData);
  return (
    <>
      <div>
        <div>
          <section>
            {compData && compData.length > 0 ? (
              <form action="#">
                {/* <label>Comptetitions</label> */}

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
        </div>
        <div>
          {teamsData ? (
            <>
              <div className="table-container">
                <div className="table-header">
                  <span>{String(leagueName).toUpperCase()}</span>
                </div>
                <table className="league-table">
                  <thead className="league-table-head">
                    <tr>
                      <th>Index</th>
                      <th>Name</th>
                      <th>Played</th>
                      <th>Won</th>
                      <th>Win Rate</th>
                      <th>Draw</th>
                      <th>Lose</th>
                      <th>Goal For</th>
                      <th>Goal Lost</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamsData.map((item, index) => {
                      const winRate = item["all-matches"]
                        ? Math.round(
                            (item["all-matches"]?.won /
                              item["all-matches"]?.played) *
                              100
                          )
                        : 0;

                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item["all-matches"]?.played}</td>
                          <td>{item["all-matches"]?.won}</td>
                          <td>{winRate}%</td>
                          <td>{item["all-matches"]?.drawn}</td>
                          <td>{item["all-matches"]?.lost}</td>
                          <td>{item["all-matches"]?.for}</td>
                          <td>{item["all-matches"]?.against}</td>
                          <td>{item["total-points"]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              {/* <h1>
                <i className="fa-solid fa-xmark" style={{ color: "white" }} />
              </h1> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default LeagueTable;
