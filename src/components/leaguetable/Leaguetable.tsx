import { footballLeageTableServices } from "@/service/leagueTableList";
import { useEffect, useState } from "react";
import { Team } from "@/interface/footballTableList";
import { callDataComp } from "@/components/competition/CompetionHook";
// import { callDataLeageTable } from "@/components/leaguetable/LeaguetableHook";
import Loading from "../loading";
import { leagueTableStyle } from "@/utils/leagueTableStyle";

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

  // 94

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

  const testingCompo = () => {
    return (
      <>
        {teamsData ? (
          <>
            <div className="table-container">
              {/* <div className="table-header-league">
                <span>{String(leagueName).toUpperCase()}</span>
              </div> */}
              {tableHeaderStyle()}
              <table className="league-table">
                <thead className="league-table-head">
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
                    <th>Win Rate</th>
                    <th>Lose Rate</th>
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
                    const lostRate = item["all-matches"]
                      ? Math.round(
                          (item["all-matches"]?.lost /
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
                        <td>{item["all-matches"]?.drawn}</td>
                        <td>{item["all-matches"]?.lost}</td>
                        <td>{item["all-matches"]?.for}</td>
                        <td>{item["all-matches"]?.against}</td>
                        <td>{item["total-points"]}</td>
                        <td>{winRate}%</td>
                        <td>{lostRate}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
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
              <p>
                <Loading />
              </p>
            )}
          </section>
        </div>
        <div>{compData ? <>{testingCompo()}</> : <></>}</div>

        {/* {teamsData ? (
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
                    <th>Draw</th>
                    <th>Lose</th>
                    <th>Goal For</th>
                    <th>Goal Lost</th>
                    <th>Points</th>
                    <th>Win Rate</th>
                    <th>Lose Rate</th>
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
                    const lostRate = item["all-matches"]
                      ? Math.round(
                          (item["all-matches"]?.lost /
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
                        <td>{item["all-matches"]?.drawn}</td>
                        <td>{item["all-matches"]?.lost}</td>
                        <td>{item["all-matches"]?.for}</td>
                        <td>{item["all-matches"]?.against}</td>
                        <td>{item["total-points"]}</td>
                        <td>{winRate}%</td>
                        <td>{lostRate}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <></>
        )} */}
      </div>
    </>
  );
}

export default LeagueTable;
