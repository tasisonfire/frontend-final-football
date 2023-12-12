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
                  <tr key={item.id} id={String(index)}>
                    <td>{item.date}</td>
                    <td>{item["home-team"].name}</td>
                    <td>{item["away-team"].name}</td>
                    <td>{item.competition.name}</td>
                    <td>{item.time}</td>
                    <td>
                      {item.status.short === "FT" ? (
                        <>
                          {item["away-team"].score} - {item["home-team"].score}
                        </>
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

export default FixtureReuse;
