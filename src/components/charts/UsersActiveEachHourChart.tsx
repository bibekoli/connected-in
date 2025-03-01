import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { getActiveTimeData } from "@/services/chart";
import ChartLoading from "@/components/Loading/ChartLoading";

export default function UsersActiveEachHourChart() {
const [loading, setLoading] = useState(true);
  const [activeTimeData, setActiveTimeData] = useState();

  useEffect(() => {
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const data = await getActiveTimeData();
        setActiveTimeData(data);
        setLoading(false);
      }
      catch (error) {
        message.error("Failed to fetch users active in each hour data");
      }
    })();
  }, []);

  return (
    <>
      <Typography.Title level={4}>Users Active In Each Hour</Typography.Title>
      {
        loading ? (
          <ChartLoading tip="Loading users active in each hour data..." />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart width={600} height={300} data={activeTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="activeUsers" stroke="#1876f2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )
      }
    </>
  );
};