import { Button, Typography, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "/logo.svg";
const { Title } = Typography;

export default function LandingPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,rgb(232, 204, 255),rgb(255, 193, 152))",
        color: "#fff",
        textAlign: "center",
        padding: "0 20px",
      }}>
      <Image
        src={logo}
        alt="ConnectedIn Logo"
        width={250}
        preview={false}
      />
      <Title level={3} style={{ color: "#222", fontSize: "20px", marginTop: "10px" }}>
        Char with your loved ones.
      </Title>

      <Link to="/login">
        <Button
          type="primary"
          size="large"
          icon={<UserOutlined />}
          style={{
            backgroundColor: "#1876f2",
            color: "#eee",
            borderColor: "#1876f2",
            marginTop: "30px",
          }}>
          Login
        </Button>
      </Link>
    </div>
  );
}
