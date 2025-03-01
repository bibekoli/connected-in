import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid } from "recharts";
import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { getUserByMessages } from "@/services/chart";
import ChartLoading from "@/components/Loading/ChartLoading";

export default function UsersByMessagesChart() {
  const [loading, setLoading] = useState(true);
  const [usersByMessagesData, setUsersByMessagesData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await getUserByMessages();
        const formattedData = data.map((item: any, index: number) => ({
          ...item,
          yValue: index + 1
        }));

        setUsersByMessagesData(formattedData);
        setLoading(false);
      }
      catch (error) {
        message.error("Failed to fetch users by messages data");
      }
    })();
  }, []);

  return (
    <>
      <Typography.Title level={4}>Users By Number of Messages Sent</Typography.Title>
      {loading ? (
        <ChartLoading tip="Loading users by messages data..." />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={usersByMessagesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="messages"
              name="Messages"
              unit=" Msg"
              domain={["auto", "auto"]}
            />
            <YAxis
              type="number"
              dataKey="yValue"
              name="User Index"
              hide={true}
            />
            <Tooltip
              formatter={(value: number, name: "Messages" | "User", props: any) => {
                if (name === "Messages") return [`${value}`, "Messages"];
                return [props.payload.user, "User"];
              }}
            />
            <Legend />
            <Scatter name="Users" data={usersByMessagesData} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
