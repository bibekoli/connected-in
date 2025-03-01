import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { getRegistrationData } from "@/services/chart";
import ChartLoading from "@/components/Loading/ChartLoading";

export default function UserRegistrationChart() {
const [loading, setLoading] = useState(true);
  const [registrationData, setRegistrationData] = useState();

  useEffect(() => {
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2500));
        const data = await getRegistrationData();
        setRegistrationData(data);
        setLoading(false);
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
            <LineChart width={1000} height={300} data={registrationData}>
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