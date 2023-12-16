import "@/App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "@/pages/home";
import LeagueTable from "@/pages/table";
import Fixture from "@/pages/fixture";
import Team from "@/pages/team";
import MyTeam from "@/pages/myteam";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/league-table",
      element: <LeagueTable />,
    },
    {
      path: "/fixture",
      element: <Fixture />,
    },
    {
      path: "/team",
      element: <Team />,
    },
    {
      path: "/myteam",
      element: <MyTeam />,
    },
  ]);

  return (
    <>
      <div className="main-container">
        <div className="navigation">
          <a href="/">
            <i className="fa-solid fa-house" style={{ color: "white" }}></i>Home
          </a>
          <a href="/league-table">
            <i
              className="fa-solid fa-table-list"
              style={{ color: "white" }}
            ></i>
            Table
          </a>
          <a href="/fixture">
            <i
              className="fa-solid fa-calendar-days"
              style={{ color: "white" }}
            ></i>
            Fixture
          </a>
          <a href="team">
            <i className="fa-solid fa-users" style={{ color: "white" }}></i>Team
          </a>
          <a href="myteam">
            <i className="fa-solid fa-user" style={{ color: "white" }}></i>My
            Team
          </a>
        </div>
        <hr />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
