import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";
import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { getMessagesSentData } from "@/services/chart";
import ChartLoading from "@/components/Loading/ChartLoading";
import { useDispatch, useSelector } from "react-redux";
import { updateChartData } from "@/redux/actions/chartDataAction";

export default function MessagesSentChart() {
const [loading, setLoading] = useState(true);
  const chartData = useSelector((state: ReduxState) => state.chartData.dailyMessagesSent);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        if (!chartData) {
          await new Promise((resolve) => setTimeout(resolve, 1300));
          const data = await getMessagesSentData();
          dispatch(updateChartData({ dailyMessagesSent: data }));
          setLoading(false);
        }
        else {
          setLoading(false);
        }
      }
      catch (error) {
        message.error("Failed to fetch messages sent data");
      }
    })();
  }, []);

  return (
    <>
      <Typography.Title level={4}>Daily Messages Sent</Typography.Title>
      {
        loading ? (
          <ChartLoading tip="Loading messages sent data..." />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart width={600} height={300} data={chartData} margin={{ top: 5, right: 0, left: -24 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="messages" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        )
      }
    </>
  );
};