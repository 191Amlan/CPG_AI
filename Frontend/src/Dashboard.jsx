import { useEffect, useState } from "react";
import { getSummary } from "./api";

function Dashboard() {

  const [data, setData] = useState({});

  useEffect(() => {

    getSummary()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <div>

      <h2>NovaBite Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginTop: "30px"
        }}
      >

        <div
          style={{
            border: "1px solid gray",
            padding: "15px",
            borderRadius: "10px"
          }}
        >
          <h3>Total Revenue</h3>
          <p>${data.total_revenue}</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "15px",
            borderRadius: "10px"
          }}
        >
          <h3>Gross Profit Margin</h3>
          <p>{data.gross_profit_margin}%</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "15px",
            borderRadius: "10px"
          }}
        >
          <h3>Top Region</h3>
          <p>{data.top_region}</p>
        </div>

      </div>

    </div>

  );
}

export default Dashboard;