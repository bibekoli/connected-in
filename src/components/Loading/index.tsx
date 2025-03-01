import { Typography } from "antd";
import loadingIcon from "/icon.gif";
import "./loading.css";

const { Text } = Typography;

export default function Loading() {
  return (
    <div className="loading-container">
      <img src={loadingIcon} alt="Loading" className="loading-icon" />
      <Text className="loading-text">Loading...</Text>
    </div>
  );
};