import { Match } from "@/interface/footballFixtureResult";
import { footballFixtureResultServices } from "@/service/fixtureResult";
import { useEffect, useState } from "react";

function FixtureResult() {
  const [fixtureResult, setFixtureResult] = useState<Match[] | undefined>([]);
  const [competion, setCompetition] = useState(1);
  const [team, setTeam] = useState(13);

  useEffect(() => {
    const callData = async (comid: number, teamid: number) => {
      const responseList =
        await footballFixtureResultServices.getFootballFixtureResult(
          comid,
          teamid
        );
      console.log(responseList.status);
      setFixtureResult(responseList.data?.["fixtures-results"].matches);
      //   console.log(
      //     responseList.data?.["fixtures-results"].matches[1]?.["home-team"].name
      //   );
    };

    callData(competion, team);
  }, []);
  //   console.log(fixtureResult?.map((item) => item.status));

  return (
    <>
      <div>
        <h1>fixture table</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Home</th>
              <th>Away</th>
              <th>Competition</th>
            </tr>
          </thead>
          <tbody>
            {fixtureResult ? (
              fixtureResult.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item["home-team"].name}</td>
                  <td>{item["away-team"].name}</td>
                  <td>{item.competition.name}</td>
                </tr>
              ))
            ) : (
              <p>!</p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FixtureResult;
