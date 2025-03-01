import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { getUsersByAge } from "@/services/chart";
import ChartLoading from "@/components/Loading/ChartLoading";

export default function UsersByAgeChart() {
const [loading, setLoading] = useState(true);
  const [usersByAgeData, setUsersByAgeData] = useState();

  useEffect(() => {
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2200));
        const data = await getUsersByAge();
        setUsersByAgeData(data);
        setLoading(false);
      }
      catch (error) {
        message.error("Failed to fetch users by age data");
      }
    })();
  }, []);

  return (
    <>
      <Typography.Title level={4}>Users By Age</Typography.Title>
      {
        loading ? (
          <ChartLoading tip="Loading users by age data..." />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart width={600} height={300} data={usersByAgeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ageGroup" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#82ca9d" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      }
    </>
  );
};