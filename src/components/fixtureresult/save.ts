// <div>
//   <h1>fixture table</h1>{" "}
//   <section>
//     {compData && compData.length > 0 ? (
//       <form action="#">
//         <label>Comptetitions</label>

//         <select
//           name="competitions"
//           id="comp"
//           value={selectedCompValue}
//           onChange={handleSelectChangeComp}
//         >
//           <option value="">Select Competition</option>
//           {compData
//             .filter((type) => type.type === "league")
//             .map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item["generic-name"]}
//               </option>
//             ))}
//         </select>
//         {/* <input type="submit" value="Submit" /> */}
//       </form>
//     ) : (
//       <p>loading..</p>
//     )}
//   </section>
//   <section>
//     <form action="">
//       <label htmlFor="teams">Teams</label>
//       <select
//         name="teams"
//         id="teams"
//         // value={selectedTeamsValue}
//         onChange={handleSelectChangeTeam}
//       >
//         <option value="">Select Team</option>

//         {teamList?.map((item) => (
//           <option key={item.id} value={item.id}>
//             {item["full-name"]}
//           </option>
//         ))}
//       </select>
//     </form>
//   </section>
//   {fixtureResult ? (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Home</th>
//             <th>Away</th>
//             <th>Competition</th>
//             <th>Status</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         {fixtureResult ? (
//           fixtureResult
//             // .filter((date) => date.date > convetedSubtractedDate)
//             .map((item, index) => (
//               <tbody>
//                 <tr key={item.id}>
//                   <td>{item.date}</td>
//                   <td>{item["home-team"].name}</td>
//                   <td>{item["away-team"].name}</td>
//                   <td>{item.competition.name}</td>
//                   <td>{item.time}</td>
//                   <td>
//                     {item.status.short === "FT" ? (
//                       <p>
//                         {item["away-team"].score} - {item["home-team"].score}
//                       </p>
//                     ) : (
//                       <p>Match not played</p>
//                     )}
//                   </td>
//                 </tr>
//               </tbody>
//             ))
//         ) : (
//           <p>Please select competion first!</p>
//         )}
//       </table>
//       <button onClick={showAllHandle}>
//         {showAll ? "Show Less" : "Show All"}
//       </button>
//     </div>
//   ) : (
//     <></>
//   )}
// </div>;
