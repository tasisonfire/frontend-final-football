import LeagueTable from "@/components/leaguetable/Leaguetable";

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
              <td>25 nov 2023</td>
              <td>manu</td>
              <td>everton</td>
              <td>premiere</td>
              <td>played</td>
              <td>0-0</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </>
  );
}

export default leagueTable;
