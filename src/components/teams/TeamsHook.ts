import { footballTeamsServices } from "@/service/allTeamList";
import { useTeamsListStore } from "@/store/footballTeamsListStore";
import { useEffect } from "react";

export const callDataTeams = (compId: number = 0) => {
  const { setTeamsStore, teams } = useTeamsListStore();
  console.log("from teamhook:", compId);

  useEffect(() => {
    // compId.compId
    // console.log(compId);
    const fetchData = async () => {
      try {
        const responseList = await footballTeamsServices.getFootballTeamsList(
          compId
        );

        // console.log(responseList.data?.teams);
        if (responseList.status === 200) {
          const responseResult = responseList.data?.teams || [];
          console.log("status team:", responseList.status);
          setTeamsStore({ teams: responseResult });
        } else {
          setTeamsStore({ teams: [] });
        }
      } catch (error) {
        console.log(error);
        setTeamsStore({ teams: [] });
      }
    };

    fetchData();
  }, []);

  return teams;
};
