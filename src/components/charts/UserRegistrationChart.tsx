import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { getRegistrationData } from "@/services/chart";
import ChartLoading from "@/components/Loading/ChartLoading";
import { useDispatch, useSelector } from "react-redux";
import { updateChartData } from "@/redux/actions/chartDataAction";

export default function UserRegistrationChart() {
  const [loading, setLoading] = useState(true);
  const chartData = useSelector((state: ReduxState) => state.chartData.userRegistered);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        if (!chartData) {
          await new Promise((resolve) => setTimeout(resolve, 2500));
          const data = await getRegistrationData();
          dispatch(updateChartData({ userRegistered: data }));
          setLoading(false);
        }
        else {
          setLoading(false);
        }
      }
      catch (error) {
        message.error("Failed to fetch registration data");
      }
    })();
  }, []);

  return (
    <>
      <Typography.Title level={4}>User Registration In This Month</Typography.Title>
      {
        loading ? (
          <ChartLoading tip="Loading user registration data..." />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart width={1000} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="natural" dataKey="registrations" stroke="#1876f2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )
      }
    </>
  );
};