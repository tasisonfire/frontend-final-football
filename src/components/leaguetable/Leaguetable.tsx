import { footballLeageTableServices } from "@/service/leagueTableList";
import { useEffect, useState } from "react";
import { Team } from "@/interface/footballTableList";
import { callDataComp } from "@/components/competition/CompetionHook";
import { callDataLeageTable } from "@/components/leaguetable/LeaguetableHook";

function LeagueTable() {
  const [teamsData, setTeamsData] = useState<Team[] | undefined>([]);
  const [selectedTeamsValue, setSelectedTeamsValue] = useState<number>();
  const [selectedCompValue, setSelectedCompValue] = useState<number>(0);

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
    };
    callDataTable(selectedCompValue);
  }, [selectedCompValue]);

  const handleSelectChangeComp = (event: any) => {
    const selectedOption = event.target.value;
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
        </div>
        <div>
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

export default LeagueTable;
