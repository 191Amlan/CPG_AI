import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function RevenueChart() {

  const [data, setData] = useState([]);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/api/trends")
      .then((res) => {
        setData(res.data);
      });

  }, []);

  return (

    <div>
      <h2>Monthly Net Revenue Trend</h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="net_revenue_usd"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

  );
}

export default RevenueChart;