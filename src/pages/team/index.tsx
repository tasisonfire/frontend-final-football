import React from "react";
import Teams from "@/components/teams/Teams";
import "@/pages/team/styles.css";

function team() {
  return (
    <>
      <h1 className="index-header">Team</h1>
      <div className="content-container">
        <Teams />
        {/* <div className="table-container-section">
          <div className="fixture-result-container">
            <div className="fixtures-btn">
              <span>Fixtures</span>
            </div>
            <div className="result-btn">
              <span>Result</span>
            </div>
          </div>
          <div className="competition-container">
            <div className="competition-header">
              <span>English Premiere League</span>
            </div>
            <div className="game-row">
              <div className="game-date">
                <span>2023-11-25</span>
              </div>
              <div className="home-team">Manchester United</div>
              <div className="result">3 - 0</div>
              <div className="away-team">Everton</div>
            </div>
            <div className="game-row">
              <div className="game-date">2023-11-25</div>
              <div className="home-team">Manchester City</div>
              <div className="result">3 - 1</div>
              <div className="away-team">Chelsea</div>
            </div>
            <div className="game-row">
              <div className="game-date">2023-11-25</div>
              <div className="home-team">Liverpool</div>
              <div className="result">3 - 0</div>
              <div className="away-team">New Castle United</div>
            </div>
          </div>
        </div>
        <div className="grid-2">
          <div className="team-detail-container">
            <div className="table-header">
              <span>Team Infomation</span>
            </div>
            <div className="team-detail-span">
              <span>Mancherter</span>
              <span>Mancherter</span>
              <span>Mancherter</span>
              <span>Mancherter</span>
            </div>
          </div>

          <div className="table-container">
            <div className="table-header">
              <span>Most Goal Scorer</span>
            </div>
            <div className="most-goalscorers-table">
              <table>
                <thead>
                  <tr id="goal-header">
                    <th>Name</th>
                    <th>Scored</th>
                  </tr>
                </thead>
                <tbody>
                  <tr id="goal-content">
                    <td>Johnathan DeHoop</td>
                    <td>5</td>
                  </tr>
                  <tr id="goal-content">
                    <td>Johnathan DeHoop</td>
                    <td>5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default team;
