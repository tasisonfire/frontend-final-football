import React from "react";
import "./styles.css";
import Teams from "@/components/teams/Teams";

function team() {
  return (
    <>
      <h1 className="index-header">Team</h1>
      <div className="content-container">
        <Teams />
      </div>
    </>
  );
}

export default team;
