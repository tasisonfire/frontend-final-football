import { footballFixtureResultServices } from "@/service/fixtureResult";
import FixtureResult from "@/components/fixtureresult/FixtureResult";

// const callData = async (comid: number, teamid: number = 0) => {
//   const responseList =
//     await footballFixtureResultServices.getFootballFixtureResult(comid, teamid);
//   console.log(responseList.status);
//   console.log(responseList.data?.["fixtures-results"].matches);
// };

function fixture() {
  return (
    <>
      <h1 className="index-header">Fixture</h1>
      {/* <FixtureResult /> */}
    </>
  );
}

export default fixture;
