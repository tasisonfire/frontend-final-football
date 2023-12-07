import { Match } from "@/interface/footballFixtureResult";
import { footballFixtureResultServices } from "@/service/fixtureResult";
import { useEffect, useState } from "react";

import { callDataComp } from "@/components/competition/CompetionHook";
import { callDataTeams } from "@/components/teams/TeamsHook";
import { footballTeamsServices } from "@/service/allTeamList";
import { Teams } from "@/interface/footballTeamsList";
import { FiveDaysDynamic } from "../dynamicDays";

import { workingFixture } from "@/utils/workingFixture";

type TParentState = {
  pickDateStart: Date;
  pickDateEnd: Date;
  pickDate: String;
};

function FixtureResult() {
  const [fixtureResult, setFixtureResult] = useState<Match[] | undefined>([]);
  const [competion, setCompetition] = useState(1);
  const [team, setTeam] = useState(0);
  const [teamList, setTeamsList] = useState<Teams[] | undefined>([]);
  const [selectedCompValue, setSelectedCompValue] = useState<number>(0);

  const [displayedData, setDisplayedData] = useState<Match[] | undefined>([]);
  const numberOfItemsToShow = 15;
  const [showAll, setShowAll] = useState(false);

  const [storeFixture, setStoreFixture] = useState<Match[] | undefined>([]);

  const [parentState, setParentState] = useState<TParentState>({
    pickDateStart: new Date(),
    pickDateEnd: new Date(),
    pickDate: "",
  });

  const handleChangesPickDate = (
    pickDateStart: Date,
    pickDateEnd: Date,
    pickDate: String
  ) => {
    setParentState({
      pickDateStart,
      pickDateEnd,
      pickDate,
    });
  };

  // console.log("start date: ", parentState.pickDateStart);
  // console.log("end date: ", parentState.pickDateEnd);
  const compData = callDataComp().competitions;
  // const teamDataList = callDataTeams().teams;

  // console.log("comp data", compDataList);
  // console.log("team data", teamDataList);

  // useEffect(() => {
  //   const groupedMatches = {};
  //   const responseLIst = workingFixture["fixtures-results"].matches;
  //   // setStoreFixture(responseLIst);
  //   responseLIst.forEach((item) => {
  //     const date = item.date;

  //     if (!groupedMatches[date]) {
  //       groupedMatches[date] = [];
  //     }

  //     groupedMatches[date].push(item);
  //   });
  //   console.log(groupedMatches);
  // }, []);

  const handleSelectChangeComp = (event: any) => {
    const selectedOption = event.target.value;
    setSelectedCompValue(selectedOption);
  };

  const handleSelectChangeTeam = (event: any) => {
    const selectedOption = event.target.value;
    // console.log(selectedOption);
    setTeam(selectedOption);
  };

  const handelShowNoPlayOnly = () => {
    setFixtureResult(
      storeFixture?.filter((item) => item.status.full.includes("Kick"))
    );
  };
  const handelShowPlayedOnly = () => {
    setFixtureResult(
      storeFixture?.filter((item) => item.status.full.includes("Full"))
    );
  };

  const handelShowAll = () => {
    setFixtureResult(storeFixture?.filter((item) => item.id));
  };

  // useEffect(() => {
  //   const responseLIst = workingFixture["fixtures-results"].matches;
  //   setStoreFixture(responseLIst);
  // }, [selectedCompValue]);

  // create new date with 5 days before
  const todayDate = new Date();
  const newTodayDate = `${todayDate.getFullYear()}-${
    todayDate.getMonth() + 1
  }-${String(todayDate.getDate()).padStart(2, "0")}`;
  // console.log("check date:", newTodayDate);
  const daysSubtracted = todayDate.setDate(todayDate.getDate() - 5);
  const convetedSubtractedDate = new Date(daysSubtracted).toISOString();

  useEffect(() => {
    if (parentState.pickDateEnd !== null) {
      const newStartDate = `${parentState.pickDateStart.getFullYear()}-${
        parentState.pickDateStart.getMonth() + 1
      }-${String(parentState.pickDateStart.getDate()).padStart(2, "0")}`;
      const newEndDate = `${parentState.pickDateEnd.getFullYear()}-${
        parentState.pickDateEnd.getMonth() + 1
      }-${String(parentState.pickDateEnd.getDate()).padStart(2, "0")}`;
      setFixtureResult(
        storeFixture?.filter(
          (item) => item.date >= newStartDate && item.date <= newEndDate
        )
      );
    }
  }, [parentState.pickDateEnd]);

  useEffect(() => {
    // const responseLIst = workingFixture["fixtures-results"].matches;
    setFixtureResult(
      storeFixture?.filter((item) => item.date === parentState.pickDate)
    );
    // console.log("fixdate");
  }, [parentState.pickDate]);

  // console.log(parentState.pickDate);

  // need to uncomment
  useEffect(() => {
    const callData = async (comid: number, teamid: number) => {
      const responseList =
        await footballFixtureResultServices.getFootballFixtureResult(
          comid,
          teamid
        );
      console.log("fixture api status: ", responseList.status);

      setFixtureResult(responseList.data?.["fixtures-results"].matches);
      setStoreFixture(responseList.data?.["fixtures-results"].matches);

      // setFixtureResult(
      //   responseList.data?.["fixtures-results"].matches.filter(
      //     (item) => item.date === todayDate.toDateString()
      //   )
      // );
      // setFixtureResult(
      //   showAll
      //     ? responseList.data?.["fixtures-results"].matches
      //     : responseList.data?.["fixtures-results"].matches
      //         .filter((date) => date.date > convetedSubtractedDate)
      //         .slice(0, numberOfItemsToShow)
      // );

      //   console.log(
      //     responseList.data?.["fixtures-results"].matches[1]?.["home-team"].name
      //   );
    };

    callData(selectedCompValue, team);
  }, [selectedCompValue, team, showAll]);

  const showAllHandle = () => {
    setShowAll(!showAll);
  };

  // need to uncomment
  // useEffect(() => {
  //   if (selectedCompValue) {
  //     const fetchTeamData = async () => {
  //       // const teamList = await callDataTeams(selectedCompValue);
  //       // setTeamLoading(true);
  //       const teamList = await footballTeamsServices.getFootballTeamsList(
  //         selectedCompValue
  //       );
  //       console.log("api fetch teams status:", teamList.status);

  //       console.log("teamlistdata: ", teamList.data?.teams);
  //       setTeamsList(teamList.data?.teams);
  //     };
  //     fetchTeamData();
  //   }
  // }, [selectedCompValue]);

  // useEffect(() => {
  //   // Slice the data to get the desired number of items
  //   setDisplayedData(
  //     fixtureResult
  //       ?.filter((date) => date.date > convetedSubtractedDate)
  //       .slice(0, numberOfItemsToShow)
  //   );
  //   console.log("from fix display", displayedData);
  // }, [fixtureResult]);

  return (
    <>
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
          </form>
        ) : (
          <p>loading..</p>
        )}
      </section>
      {selectedCompValue ? (
        <>
          <FiveDaysDynamic handleChanges={handleChangesPickDate} />
          <div className="grid-3">
            <div className="fixtures-btn" onClick={handelShowNoPlayOnly}>
              <span>All Fixtures</span>
            </div>
            <div className="result-btn" onClick={handelShowPlayedOnly}>
              <span>All Result</span>
            </div>
            <div className="showall-btn" onClick={handelShowAll}>
              <span>Show All</span>
            </div>
          </div>

          <div className="competition-container">
            <div className="competition-header">
              <span>Table</span>
            </div>
            {fixtureResult?.map((item) => (
              <>
                <div className="game-row">
                  <div className="game-date">
                    <span>{item.date}</span>
                  </div>

                  <div className="home-team">{item["home-team"].name}</div>
                  {item.status.full !== "Full Time" ? (
                    <>
                      <div className="result"> - </div>
                    </>
                  ) : (
                    <>
                      <div className="result">
                        {item["home-team"].score} - {item["away-team"].score}
                      </div>
                    </>
                  )}
                  <div className="away-team">{item["away-team"].name}</div>
                </div>
              </>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default FixtureResult;
