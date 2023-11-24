import { Match } from "@/interface/footballFixtureResult";
import { footballFixtureResultServices } from "@/service/fixtureResult";
import { useEffect, useState } from "react";

import { callDataComp } from "@/components/competition/CompetionHook";
import { callDataTeams } from "@/components/teams/TeamsHook";
import { footballTeamsServices } from "@/service/allTeamList";
import { Teams } from "@/interface/footballTeamsList";

function FixtureResult() {
  const [fixtureResult, setFixtureResult] = useState<Match[] | undefined>([]);
  const [competion, setCompetition] = useState(1);
  const [team, setTeam] = useState(0);
  const [teamList, setTeamsList] = useState<Teams[] | undefined>([]);
  const [selectedCompValue, setSelectedCompValue] = useState<number>(0);

  const compData = callDataComp().competitions;
  // const teamDataList = callDataTeams().teams;

  // console.log("comp data", compDataList);
  // console.log("team data", teamDataList);

  const handleSelectChangeComp = (event: any) => {
    const selectedOption = event.target.value;
    setSelectedCompValue(selectedOption);
  };

  const handleSelectChangeTeam = (event: any) => {
    const selectedOption = event.target.value;
    // console.log(selectedOption);
    setTeam(selectedOption);
  };

  useEffect(() => {
    const callData = async (comid: number, teamid: number) => {
      const responseList =
        await footballFixtureResultServices.getFootballFixtureResult(
          comid,
          teamid
        );
      console.log("fixture api status: ", responseList.status);
      setFixtureResult(responseList.data?.["fixtures-results"].matches);
      //   console.log(
      //     responseList.data?.["fixtures-results"].matches[1]?.["home-team"].name
      //   );
    };

    callData(selectedCompValue, team);
  }, [selectedCompValue, team]);

  useEffect(() => {
    if (selectedCompValue) {
      const fetchTeamData = async () => {
        // const teamList = await callDataTeams(selectedCompValue);
        // setTeamLoading(true);
        const teamList = await footballTeamsServices.getFootballTeamsList(
          selectedCompValue
        );
        console.log("api fetch teams status:", teamList.status);

        console.log("teamlistdata: ", teamList.data?.teams);
        setTeamsList(teamList.data?.teams);
      };
      fetchTeamData();
    }
  }, [selectedCompValue]);

  // create new date with 5 days before
  const todayDate = new Date();
  const daysSubtracted = todayDate.setDate(todayDate.getDate() - 15);
  const convetedSubtractedDate = new Date(daysSubtracted).toISOString();

  return (
    <>
      <div>
        <h1>fixture table</h1>{" "}
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
                // value={selectedTeamsValue}
                onChange={handleSelectChangeTeam}
              >
                <option value="">Select Team</option>

                {teamList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item["full-name"]}
                  </option>
                ))}
              </select>
            </form>
          ) : (
            <p>Select competition first..</p>
          )}
        </section>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Home</th>
              <th>Away</th>
              <th>Competition</th>
              <th>Status</th>
              <th>Score</th>
            </tr>
          </thead>
          {fixtureResult ? (
            fixtureResult
              .filter((date) => date.date > convetedSubtractedDate)
              .map((item, index) => (
                <tbody>
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item["home-team"].name}</td>
                    <td>{item["away-team"].name}</td>
                    <td>{item.competition.name}</td>
                    <td>{item.time}</td>
                    <td>
                      {item.status.short === "FT" ? (
                        <p>
                          {item["away-team"].score} - {item["home-team"].score}
                        </p>
                      ) : (
                        <p>Match not played</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))
          ) : (
            <p>Please select competion first!</p>
          )}
        </table>
      </div>
    </>
  );
}

export default FixtureResult;
