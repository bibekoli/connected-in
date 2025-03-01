import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";
import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { getMessagesSentData } from "@/services/chart";
import ChartLoading from "@/components/Loading/ChartLoading";

export default function MessagesSentChart() {
const [loading, setLoading] = useState(true);
  const [messagesSentData, setMessagesSentData] = useState();

  useEffect(() => {
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1300));
        const data = await getMessagesSentData();
        setMessagesSentData(data);
        setLoading(false);
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
            <AreaChart width={600} height={300} data={messagesSentData}>
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