import "@/App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "@/pages/home";
import LeagueTable from "@/pages/table";
import Fixture from "@/pages/fixture";
import Team from "@/pages/team";

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
  ]);
  return (
    <>
      <div>
        <div className="navigation">
          <a href="/">Home</a>
          <a href="/league-table">Table</a>
          <a href="/fixture">Fixture</a>
          <a href="team">Team</a>
        </div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
