import { footballFixtureResultServices } from "@/service/fixtureResult";
import FixtureResult from "@/components/fixtureresult/FixtureResult";

import axios from "axios";
import { workingFixture } from "@/utils/workingFixture";

// const callData = async (comid: number, teamid: number = 0) => {
//   const responseList =
//     await footballFixtureResultServices.getFootballFixtureResult(comid, teamid);
//   console.log(responseList.status);
//   console.log(responseList.data?.["fixtures-results"].matches);
// };

// const callDateFixtureResult = async () => {
//   const responseList =
//     await axios.get()
// };

function fixture() {
  const matches = workingFixture.fixture["fixtures-results"].matches;

  console.log(matches.map((item) => item["away-team"]));

  // const apiDate = "2023-08-14";
  // const apiNewDate = new Date(apiDate).toISOString();
  // console.log(apiNewDate);

  // const todayDate = new Date();
  // const daysSubtracted = todayDate.setDate(todayDate.getDate() - 5);
  // const convertedDate = new Date(daysSubtracted).toISOString();
  // console.log(convertedDate);

  // console.log(apiNewDate < convertedDate);

  return (
    <>
      <h1 className="index-header">Fixture</h1>
      <div className="content-container">
        <FixtureResult />
      </div>
      {/* {matches.map((item) => item.venue)} */}
    </>
  );
}

export default fixture;
