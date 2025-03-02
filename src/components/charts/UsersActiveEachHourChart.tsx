import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { getActiveTimeData } from "@/services/chart";
import ChartLoading from "@/components/Loading/ChartLoading";
import { useDispatch, useSelector } from "react-redux";
import { updateChartData } from "@/redux/actions/chartDataAction";

export default function UsersActiveEachHourChart() {
const [loading, setLoading] = useState(true);
  const chartData = useSelector((state: ReduxState) => state.chartData.userActiveEachHour);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        if (!chartData) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const data = await getActiveTimeData();
          dispatch(updateChartData({ userActiveEachHour: data }));
          setLoading(false);
        }
        else {
          setLoading(false);
        }
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
            <LineChart width={600} height={300} data={chartData}>
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