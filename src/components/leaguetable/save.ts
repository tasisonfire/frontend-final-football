{
  teamsData ? (
    <table>
      <thead>
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
      {teamsData ? (
        teamsData.map((item, index) => {
          const totalPoints =
            (item["all-matches"]?.won || 0) * 3 +
            (item["all-matches"]?.drawn || 0);
          return (
            <tbody>
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item["all-matches"]?.played}</td>
                <td>{item["all-matches"]?.won}</td>
                <td>{item["all-matches"]?.drawn}</td>
                <td>{item["all-matches"]?.lost}</td>
                <td>{item["all-matches"]?.for}</td>
                <td>{item["all-matches"]?.against}</td>
                <td>{item["total-points"]}</td>
                {/* <td>{totalPoints}</td> */}
              </tr>
            </tbody>
          );
        })
      ) : (
        <p>Loading..</p>
      )}
    </table>
  ) : (
    <p>Please select competion</p>
  );
}
