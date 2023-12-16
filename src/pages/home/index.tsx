import "./styles.css";
import { useEffect, useState } from "react";
import Favoriteteam from "@/components/favoriteteam/Favoriteteam";
import FixtureReuse from "@/components/fixtureresultreuseable/fixturereuse";
import { footballGoalScorers } from "@/service/goalscorers";
import { Player } from "@/interface/footballGoalScorers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeagueTableReuse from "@/components/leaguetablereuse/tablereuse";
import TeamInfoReuse from "@/components/teaminforeuse/teaminforeuse";
import { leagueTableStyle } from "@/utils/leagueTableStyle";
import { Match } from "@/interface/footballFixtureResult";
import { workingFixture } from "@/utils/workingFixture";
import { footballLeageTableServices } from "@/service/leagueTableList";
import { Team, Competition } from "@/interface/footballTableList";
import { footballFixtureResultServices } from "@/service/fixtureResult";
import Loading from "@/components/loading";

type TStatus = {
  status: "loading" | "done";
};

function index() {
  // const [fixtureResult, setFixtureResult] = useState<Match[] | undefined>([]);
  const [fixtureResult, setFixtureResult] = useState<Match[] | undefined>([]);
  const [teamsData, setTeamsData] = useState<Team[] | undefined>([]);
  const [leagueName, setLeagueName] = useState<string | undefined>(
    "Premier League"
  );
  const [compId, setComId] = useState<number>(1);
  const [teamId, setTeamId] = useState<number>(0);

  const [status, setStatus] = useState("loading");

  const [displayedData, setDisplayedData] = useState<Match[] | undefined>([]);
  const numberOfItemsToShow = 15;

  // create new date with 5 days before
  const todayDate = new Date();
  const newTodayDate = `${todayDate.getFullYear()}-${
    todayDate.getMonth() + 1
  }-${String(todayDate.getDate()).padStart(2, "0")}`;
  // console.log("check date:", newTodayDate);
  const daysSubtracted = todayDate.setDate(todayDate.getDate() - 5);
  const convetedSubtractedDate = new Date(daysSubtracted).toISOString();

  useEffect(() => {
    const callLeagueTableData = async (comId: number) => {
      setStatus("loading");
      const responseList =
        await footballLeageTableServices.getFootballLeageTable(comId);
      setTeamsData(responseList.data?.["league-table"].teams);
      setLeagueName(responseList.data?.["league-table"].competition.name);
      // console.log(responseList.data?.["league-table"].teams);
    };
    callLeagueTableData(compId);

    const callFixtureResultData = async (
      compId: number,
      teamId: number = 0
    ) => {
      const responseLIst =
        await footballFixtureResultServices.getFootballFixtureResult(
          compId,
          teamId
        );
      setStatus("");

      // console.log(
      //   responseLIst.data?.["fixtures-results"].matches
      //     .filter((date) => date.date > convetedSubtractedDate)
      //     .slice(0, numberOfItemsToShow)
      // );

      setFixtureResult(
        responseLIst.data?.["fixtures-results"].matches
          .filter((date) => date.date > convetedSubtractedDate)
          .filter((played) => played.status.short != "FT")
          .slice(0, numberOfItemsToShow)
      );
    };
    callFixtureResultData(compId);
    // setFixtureResult(
    //   workingFixture["fixtures-results"].matches
    //     .filter((date) => date.date > convetedSubtractedDate)
    //     .slice(0, numberOfItemsToShow)
    // );
  }, [compId]);

  useEffect(() => {
    const callFixtureResultData = async (compId: number, teamId: number) => {
      const responseLIst =
        await footballFixtureResultServices.getFootballFixtureResult(
          compId,
          teamId
        );
      setFixtureResult(
        responseLIst.data?.["fixtures-results"].matches
          .filter((date) => date.date > convetedSubtractedDate)
          .filter((played) => played.status.short != "FT")
          .slice(0, numberOfItemsToShow)
      );
    };
    callFixtureResultData(compId, teamId);
  }, [teamId]);

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
              <img src={leagueTableStyle.seriea.logo1} alt="" />
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
  };

  useEffect(() => {
    console.log(compId);
  }, [compId]);

  useEffect(() => {
    // Slice the data to get the desired number of items
    setDisplayedData(
      fixtureResult
        ?.filter((date) => date.date > convetedSubtractedDate)
        .slice(0, numberOfItemsToShow)
    );
  }, [fixtureResult]);

  return (
    <>
      <div className="index-container">
        <div className="index-content-container">
          <div className="index-content-container-header">
            <span>TOP LEAGUE</span>
          </div>

          <div className="topleague-logo-container">
            <div className="league-logo" onClick={() => setComId(1)}>
              <img src="epl.png" alt="" />
              <span>English Premiere League</span>
            </div>
            <div className="league-logo" onClick={() => setComId(94)}>
              <img src="LaLiga.png" alt="" />
              <span>LaLiga League</span>
            </div>
            <div className="league-logo" onClick={() => setComId(92)}>
              <img src="bundes-logo-long.png" alt="" />
              <span>BudesLiga League</span>
            </div>
            <div className="league-logo" onClick={() => setComId(93)}>
              {/* <img src="Italian-Serie-A-Logo-2019.png" alt="" /> */}
              <img src="serieA.png" alt="" />
              {/* <img src="serie-a-logo.png" alt="" /> */}
              <span>Serie A League</span>
            </div>
          </div>

          {status === "loading" ? (
            <>
              <div className="loading-container">
                <Loading />
                <h1>Loading..</h1>
              </div>
            </>
          ) : (
            <>
              {/* <h1>This is new home!</h1> */}

              <div className="top-league-table-container">
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
                    </tr>
                  </thead>
                  <tbody>
                    {teamsData ? (
                      <>
                        {teamsData.map((item, index) => (
                          <tr
                            key={item.id}
                            onClick={() => setTeamId(Number(item.id))}
                          >
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item["all-matches"]?.played}</td>
                            <td>{item["all-matches"]?.won}</td>
                            <td>{item["all-matches"]?.drawn}</td>
                            <td>{item["all-matches"]?.lost}</td>
                            <td>{item["all-matches"]?.for}</td>
                            <td>{item["all-matches"]?.against}</td>
                            <td>{item["total-points"]}</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <>
                        <p>Something went wrong</p>
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="top-league-fixture-container">
                <div className="competition-container">
                  <div className="competition-header">
                    <span>Up Comming Games</span>
                  </div>
                  {fixtureResult?.map((item) => (
                    <>
                      <div className="game-row">
                        <div className="game-date">
                          <span>{item.date}</span>
                        </div>

                        <div
                          className="home-team"
                          onClick={() => setTeamId(item["home-team"].id)}
                        >
                          {item["home-team"].name}
                        </div>
                        {item.status.full !== "Full Time" ? (
                          <>
                            <div className="result"> - </div>
                          </>
                        ) : (
                          <>
                            <div className="result">
                              {item["home-team"].score} -{" "}
                              {item["away-team"].score}
                            </div>
                          </>
                        )}
                        <div
                          className="away-team"
                          onClick={() => setTeamId(item["away-team"].id)}
                        >
                          {item["away-team"].name}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default index;
