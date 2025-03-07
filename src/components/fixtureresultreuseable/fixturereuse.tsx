import { footballFixtureResultServices } from "@/service/fixtureResult";
import { useEffect, useState } from "react";
import { Match } from "@/interface/footballFixtureResult";

type THandleChanges = {
  handleChanges: (compId: Number, teamId: Number) => void;
};

function FixtureReuse() {
  const [fixtureResult, setFixtureResult] = useState<Match[] | undefined>([]);

  const todayDate = new Date();
  const daysSubtracted = todayDate.setDate(todayDate.getDate() - 15);
  const convetedSubtractedDate = new Date(daysSubtracted).toISOString();

  const favoriteTeamID = localStorage.getItem("favo_team_id");
  const favoriteCompID = localStorage.getItem("favo_comp_id");

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

    callData(Number(favoriteCompID), Number(favoriteTeamID));
  }, []);

  return (
    <>
      <div>
        <h1>fixture table</h1>{" "}
        {fixtureResult ? (
          <>
            <div className="competition-container">
              <div className="competition-header">
                <span>Fixture Table</span>
              </div>
              {fixtureResult.map((item) => (
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
              ))}
            </div>
          </>
        ) : (
          <>
            <p>asdf</p>
          </>
        )}
      </div>
    </>
  );
}

export default FixtureReuse;
