import { useEffect, useState } from "react";
import { callDataComp } from "@/components/competition/CompetionHook";
import { footballTeamsServices } from "@/service/allTeamList";
import { Teams } from "@/interface/footballTeamsList";
import { TeamDetail } from "@/interface/footballTeamInfo";
import footballTeamServices from "@/service/teamInfo";
// import { team } from "@/utils/optionList";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../loading";

const notifyNoFavo = () =>
  toast.error("Please select a favorite team!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
const notifyHaveFavo = () => {
  toast.success(`You already have favorite team!`, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

if (localStorage.getItem("favo_team_id") === null) {
  notifyNoFavo();
} else {
  notifyHaveFavo();
}

function Favoriteteam() {
  const [selectedCompValue, setSelectedCompValue] = useState<number>();
  const [selectedTeamsValue, setSelectedTeamsValue] = useState<number>();
  const [teamList, setTeamsList] = useState<Teams[] | undefined>([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [favoriteTeamDetail, setFavoriteTeamDetail] = useState<TeamDetail>();

  const compData = callDataComp().competitions; //use for fetch all comptertion from CompetitionHook

  // use for testing competions and team list calling from store
  // const teamList = callDataTeams(selectedCompValue).teams;
  // console.log(compData);

  // update competition to setSelectCompValue
  const handleSelectChangeComp = (event: any) => {
    const selectedOption = event.target.value;
    setSelectedCompValue(selectedOption);
  };

  // will getupdate when user select competion > update teams list from selected competition
  useEffect(() => {
    if (selectedCompValue) {
      const fetchTeamData = async () => {
        // const teamList = await callDataTeams(selectedCompValue);
        setTeamLoading(true);
        const teamList = await footballTeamsServices.getFootballTeamsList(
          selectedCompValue
        );
        console.log("api fetch teams status:", teamList.status);

        // console.log(teamList.data?.teams);
        setTeamsList(teamList.data?.teams);
      };
      fetchTeamData();
    }
  }, [selectedCompValue]);

  // check if have favorite team then will update team data to favoriteTeamDetail
  useEffect(() => {
    const favoTeamId = localStorage.getItem("favo_team_id");

    if (favoTeamId) {
      const fetchTeamDetail = async () => {
        const teamDetail = await footballTeamServices.getFootballTeamInfo(
          Number(favoTeamId)
        );

        console.log("api fetch team detail status:", teamDetail.status);
        // console.log(teamDetail);
        setFavoriteTeamDetail(teamDetail.data?.team);
      };

      fetchTeamDetail();
    }
  }, []);

  const handleSelectChangeTeam = (event: any) => {
    const selectedOption = event.target.value;
    // console.log(selectedOption);
    setSelectedTeamsValue(selectedOption);
  };

  const handleFavoTeam = (event: any) => {
    event.preventDefault();
    window.location.reload();
    // const selectedOption = event.target.value;
    console.log(selectedTeamsValue);
    localStorage.setItem("favo_team_id", `${selectedTeamsValue}`);
    localStorage.setItem("favo_comp_id", `${selectedCompValue}`);
  };

  const handleCheckFavo = (event: any) => {
    event.preventDefault();
    const favoriteTeamDetail = localStorage.getItem("favo_team_id");
    console.log(favoriteTeamDetail);
  };

  const handleRemoveFavo = (event: any) => {
    event.preventDefault();
    window.location.reload();
    localStorage.removeItem("favo_team_id");
    localStorage.removeItem("favo_comp_id");
    console.log("Favorite team removed");
  };

  return (
    <>
      <div>
        <ToastContainer />
        {localStorage.getItem("favo_team_id") ? (
          <p></p>
        ) : (
          <div className="dropdown-container">
            <section>
              {compData && compData.length > 0 ? (
                <>
                  <div className="comp-team-container">
                    <div>
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
                    </div>
                    <div>
                      <form action="">
                        {/* <label htmlFor="teams">Teams</label> */}
                        <select
                          name="teams"
                          id="teams"
                          value={selectedTeamsValue}
                          onChange={handleSelectChangeTeam}
                        >
                          <option value="">Select Team</option>

                          {teamList?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item["full-name"]}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={(event) => {
                            handleFavoTeam(event);
                          }}
                        >
                          Save
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Loading />
                  {/* <p>loading..</p> */}
                </>
              )}
            </section>
          </div>
        )}
      </div>
      <section>
        {localStorage.getItem("favo_team_id") ? (
          <div className="choose-team-container">
            <div className="choose-team-bg">
              <p id="favorite-team-title">
                Your favorite team is{" "}
                <span id="name-favo-span">
                  {favoriteTeamDetail?.name?.toUpperCase()}
                </span>
              </p>
              <button onClick={handleRemoveFavo}>Change Favorite Team</button>
            </div>
          </div>
        ) : (
          <p></p>
        )}
        {/* <button onClick={handleCheckFavo}>check favo</button> */}
      </section>
    </>
  );
}

//   return (
//     <>
//       {compData && compData.length > 0 ? (
//         <ul style={{ listStyle: "none" }}>
//           {compData
//             .filter((type) => type.type === "league")
//             .map((item) => (
//               <li key={item.id} value={item.id}>
//                 {item["generic-name"]}
//               </li>
//             ))}
//         </ul>
//       ) : (
//         <p>Loading..</p>
//       )}
//     </>
//   );
// }

export default Favoriteteam;

// {
//   /* <>
// {compData && compData.length > 0 ? (
//   <ul style={{ listStyle: "none" }}>
//     {compData
//       .filter((type) => type.type === "league")
//       .map((item) => (
//         <li key={item.id} value={item.id}>
//           {item["generic-name"]}
//         </li>
//       ))}
//   </ul>
// ) : (
//   <p>Loading..</p>
// )}
// </> */
// }
