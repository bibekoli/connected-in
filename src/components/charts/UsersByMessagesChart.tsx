import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid } from "recharts";
import { useState, useEffect } from "react";
import { Typography, message } from "antd";
import { getUserByMessages } from "@/services/chart";
import ChartLoading from "@/components/Loading/ChartLoading";
import { useDispatch, useSelector } from "react-redux";
import { updateChartData } from "@/redux/actions/chartDataAction";

export default function UsersByMessagesChart() {
  const [loading, setLoading] = useState(true);
  const chartData = useSelector((state: ReduxState) => state.chartData.userByMessagesSent);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        if (!chartData) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const data = await getUserByMessages();
          const formattedData = data.map((item: any, index: number) => ({
            ...item,
            yValue: index + 1
          }));

          dispatch(updateChartData({ userByMessagesSent: formattedData }));
          setLoading(false);
        }
        else {
          setLoading(false);
        }
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
          <ScatterChart data={chartData}>
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
            <Scatter name="Users" data={chartData} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
