import { footballCompServices } from "@/service/allCompList";
import { useCompetitionsListStore } from "@/store/footballCompListStore";
import React, { useEffect } from "react";

export const callDataComp = () => {
  const { setCompetitionsStore, competitions } = useCompetitionsListStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseList = await footballCompServices.getFootballCompList();
        // setCompetitionsStore({ competitions: [] });
        // responseList.data?.competitions.type

        if (responseList.status === 200) {
          const responseResults = responseList.data?.competitions || [];
          // console.log("responseResult", responseResults);
          console.log("api fetch competition status:", responseList.status);
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
