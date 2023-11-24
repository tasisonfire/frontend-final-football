import { useState, useEffect } from "react";
import { callDataComp } from "../competition/CompetionHook";
import { footballTeamsServices } from "@/service/allTeamList";
import { Teams } from "@/interface/footballTeamsList";

type THandleChanges = {
  handleChanges: (selectedCompValue: Number, team: Number) => void;
};

export function CompTeamInput({ handleChanges }: THandleChanges) {
  const [selectedCompValue, setSelectedCompValue] = useState(0);
  const [selectedTeamsValue, setSelectedTeamsValue] = useState();
  const [teamsList, setTeamsList] = useState<Teams[] | undefined>([]);
  const [team, setTeam] = useState(0);

  const compData = callDataComp().competitions;

  useEffect(() => {
    if (selectedCompValue) {
      const fetchTeamData = async () => {
        // const teamList = await callDataTeams(selectedCompValue);
        // setTeamLoading(true);
        const teamList = await footballTeamsServices.getFootballTeamsList(
          selectedCompValue
        );
        console.log("api fetch teams status:", teamList.status);

        // console.log("teamlistdata: ", teamList.data?.teams);
        setTeamsList(teamList.data?.teams);
      };
      fetchTeamData();
    }
  }, [selectedCompValue]);

  const handleSelectChangeComp = (event: any) => {
    const selectedOption = event.target.value;

    setSelectedCompValue(selectedOption);
  };

  const handleSelectChangeTeam = (event: any) => {
    const selectedOption = event.target.value;
    setTeam(selectedOption);
  };

  useEffect(() => {
    handleChanges(selectedCompValue, team);
  }, [selectedCompValue, team]);

  return (
    <>
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
        {teamsList && teamsList.length > 0 ? (
          <form action="">
            <label htmlFor="teams">Teams</label>
            <select
              name="teams"
              id="teams"
              value={selectedTeamsValue}
              onChange={handleSelectChangeTeam}
            >
              <option value="">Select Team</option>

              {teamsList.map((item) => (
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
    </>
  );
}
