import React from "react";
import { callDataComp } from "../competition/CompetionHook";

function CompetitionEx() {
  const compData = callDataComp().competitions;
  return (
    <>
      {compData.map((item) => (
        <>{item["full-name"]}</>
      ))}
    </>
  );
}

export default CompetitionEx;
