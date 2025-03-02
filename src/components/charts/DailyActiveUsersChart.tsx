import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Bar, BarChart } from "recharts";
import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { getDailyActiveUsersData } from "@/services/chart";
import ChartLoading from "@/components/Loading/ChartLoading";
import { useDispatch, useSelector } from "react-redux";
import { updateChartData } from "@/redux/actions/chartDataAction";

export default function DailyActiveUsers() {
  const [loading, setLoading] = useState(true);
  const chartData = useSelector((state: ReduxState) => state.chartData.dailyActiveUser);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        if (!chartData) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const data = await getDailyActiveUsersData();
          dispatch(updateChartData({ dailyActiveUser: data }));
          setLoading(false);
        }
        else {
          setLoading(false);
        }
      }
      catch (error) {
        message.error("Failed to fetch daily active users data");
      }
    })();
  }, []);

  return (
    <>
      <Typography.Title level={4}>Daily Active Users In Last Week</Typography.Title>
      {
        loading ? (
          <ChartLoading tip="Loading daily active users data..." />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart width={600} height={300} data={chartData} margin={{ top: 5, right: 0, left: -30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="male" fill="#A19AD3" radius={[10, 10, 0, 0]} />
              <Bar dataKey="female" fill="#82ca9d" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      }
    </>
  );
}