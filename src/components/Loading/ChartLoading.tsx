import { Spin } from "antd";

export default function ChartLoading({ tip }: { tip?: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 300
        }}>
        <Spin tip={ tip ? tip : "Loading chart..." } />
    </div>
  );
};