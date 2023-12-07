import LeagueTable from "@/components/leaguetable/Leaguetable";
import "./styles.css";

function leagueTable() {
  return (
    <>
      <h1 className="index-header">Leage Table</h1>
      <div className="content-container">
        <LeagueTable />
        {/* <label htmlFor="">
          <select name="" id="">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>
        </label>
        <button>select</button> */}
        {/* <div className="table-container">
          <div className="table-header">
            <span>REGULAR SEASON</span>
          </div>
          <table className="league-table">
            <thead className="league-table-head">
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Played</th>
                <th>Won</th>
                <th>Draw</th>
                <th>Lose</th>
                <th>Goal For</th>
                <th>Goal Lost</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Arsenal</td>
                <td>9</td>
                <td>3</td>
                <td>1</td>
                <td>27</td>
                <td>10</td>
                <td>30</td>
                <td>30</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Manchester United</td>
                <td>9</td>
                <td>3</td>
                <td>1</td>
                <td>27</td>
                <td>10</td>
                <td>30</td>
                <td>30</td>
              </tr>
              <tr>
                <td>1</td>
                <td>New Castle United the football club</td>
                <td>9</td>
                <td>3</td>
                <td>1</td>
                <td>27</td>
                <td>10</td>
                <td>30</td>
                <td>30</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </>
  );
}

export default leagueTable;
