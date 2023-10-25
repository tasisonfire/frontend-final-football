import { footballCompServices } from "@/service/allCompList";
import { useCompetitionsListStore } from "@/store/footballCompList";
import React, { useEffect } from "react";

export const callDataComp = () => {
  const { setCompetitionsStore, competitions } = useCompetitionsListStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseList = await footballCompServices.getFootballCompList();
        // setCompetitionsStore({ competitions: [] });

        if (responseList.status === 200) {
          const responseResults = responseList.data?.competitions || [];
          // console.log("responseResult", responseResults);
          console.log("status:", responseList.status);
          setCompetitionsStore({ competitions: responseResults });
        } else {
          setCompetitionsStore({
            competitions: [],
          });
        }
      } catch (error) {
        console.log(error);
        setCompetitionsStore({ competitions: [] });
      }
    };

    fetchData();
  }, []);

  return competitions;
};
