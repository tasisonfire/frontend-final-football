import React from "react";
import { callDataComp } from "@/components/Competion";

function CompetionHook() {
  const compData = callDataComp().competitions;
  //   console.log(callDataComp().competitions);
  return (
    <>
      <ul style={{ listStyle: "none" }}>
        {compData.map((item) => (
          <li key={item.id}>{item["generic-name"]}</li>
        ))}
      </ul>
    </>
  );
}

export default CompetionHook;
