import { Tooltip, Legend, ResponsiveContainer, PieChart, Cell, Pie } from "recharts";
import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { getTotalUsersData } from "@/services/chart";
import ChartLoading from "@/components/Loading/ChartLoading";

export default function TotalUsersChart() {
  const [loading, setLoading] = useState(true);
  const [totalUserData, setTotalUserData] = useState();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  useEffect(() => {
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1700));
        const data = await getTotalUsersData();

        setTotalUserData(data);
      }
      catch (error) {
        message.error("Failed to fetch total users data");
      }
      finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Typography.Title level={4}>Total Users By Gender</Typography.Title>
      {loading ? (
        <ChartLoading tip="Loading total users data..." />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={totalUserData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              dataKey="value"
            >
              {(totalUserData as any).map((_entry: string, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
