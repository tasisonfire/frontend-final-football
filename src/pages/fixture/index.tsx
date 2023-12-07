import { footballFixtureResultServices } from "@/service/fixtureResult";
import FixtureResult from "@/components/fixtureresult/FixtureResult";
import axios from "axios";
import { workingFixture } from "@/utils/workingFixture";
import "./style.css";

// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

// const callData = async (comid: number, teamid: number = 0) => {
//   const responseList =
//     await footballFixtureResultServices.getFootballFixtureResult(comid, teamid);
//   console.log(responseList.status);
//   console.log(responseList.data?.["fixtures-results"].matches);
// };

// const callDateFixtureResult = async () => {
//   const responseList =
//     await axios.get()
// };

function fixture() {
  const [pickDate, setPickDate] = useState<Date | null>(new Date());
  const matches = workingFixture["fixtures-results"].matches;

  console.log(matches.map((item) => item["away-team"]));

  // const apiDate = "2023-08-14";
  // const apiNewDate = new Date(apiDate).toISOString();
  // console.log(apiNewDate);

  // const todayDate = new Date();
  // const daysSubtracted = todayDate.setDate(todayDate.getDate() - 5);
  // const convertedDate = new Date(daysSubtracted).toISOString();
  // console.log(convertedDate);

  // console.log(apiNewDate < convertedDate);

  const handleDatePicker = (date: Date | null) => {
    // e.preventDefault();
    setPickDate(date);
    console.log(date);
  };

  const todayNow = new Date();
  const todayDate = todayNow.getDate();
  const todayDay = todayNow.toLocaleString("en-US", { weekday: "short" });
  const todayMonth = todayNow.toLocaleString("en-US", { month: "short" });
  // console.log(todayDate, todayMonth, todayDay);

  const extraDay1 = new Date(todayNow);
  extraDay1.setDate(todayNow.getDate() + 1);
  const extraDate = extraDay1.getDate();
  const extraDay = extraDay1.toLocaleString("en-US", { weekday: "short" });
  const extraMonth = extraDay1.toLocaleString("en-US", { month: "short" });
  // console.log("extra1:", extraDay1);

  return (
    <>
      <h1 className="index-header">Fixture</h1>
      <div className="content-container"></div>

      <FixtureResult />
      {/* {matches.map((item) => item.venue)} */}
      {/* <label htmlFor="">
        <select name="" id="">
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
        </select>
      </label>
      <button>select</button> */}
      {/* <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Home</th>
            <th>Away</th>
            <th>Competition</th>
            <th>Status</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2023-11-30</td>
            <td>Manchester United</td>
            <td>Everton</td>
            <td>English premiere Legue</td>
            <td>Played</td>
            <td>1-0</td>
          </tr>
          <tr>
            <td>2023-11-30</td>
            <td>Manchester United</td>
            <td>Everton</td>
            <td>English premiere Legue</td>
            <td>Played</td>
            <td>1-0</td>
          </tr>
          <tr>
            <td>2023-11-30</td>
            <td>Manchester United</td>
            <td>Everton</td>
            <td>English premiere Legue</td>
            <td>Played</td>
            <td>1-0</td>
          </tr>
        </tbody>
      </table> */}
      {/* <div className="date-container">
        <div className="date">
          <span>Tue</span>
          <span>28 NOV</span>
        </div>
        <div className="date">
          <span>Wed</span>
          <span>29 NOV</span>
        </div>
        <div className="date today-date" onClick={() => console.log(todayNow)}>
          <span>{todayDay}</span>
          <span>
            {todayDate} {todayMonth.toUpperCase()}
          </span>
        </div>
        <div className="date">
          <span>Thu</span>
          <span>30 NOV</span>
        </div>
        <div className="date" onClick={() => console.log(extraDay1)}>
          <span>{extraDay}</span>
          <span>
            {extraDate} {extraMonth.toLocaleUpperCase()}
          </span>
        </div>
        <div className="date">
          <span>
            <DatePicker
              selected={pickDate}
              onChange={(date) => handleDatePicker(date)}
            />
          </span>
          <span>calendar</span>
          <div className="calendar-datepicker"></div>
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
      </div> */}
    </>
  );
}

export default fixture;
