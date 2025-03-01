import { useSelector } from "react-redux";
import { Layout, Menu, Dropdown, Avatar, Button } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardOutlined, MessageOutlined, SettingOutlined } from "@ant-design/icons";
import "./DashboardLayout.css";

const { Header, Content } = Layout;

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();
  const currentUser = useSelector((state: ReduxState) => state.currentUser);

  const menuItems = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/chats", icon: <MessageOutlined />, label: "Chats" },
    { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  const profileMenuItems = [
    {
      key: "/profile",
      label: "Profile",
      onClick: () => navigate("/profile")
    },
    {
      key: "logout",
      label: "Logout",
      onClick: async () => {
        await logout();
        navigate("/login");
      }
    },
  ];

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Header className="dashboard-header">
        <div className="header-logo">
          <img src="/logo.svg" alt="ConnectedIn" style={{ height: 40 }} />
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className="header-menu"
        />
        <Dropdown
          menu={{ items: profileMenuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button type="text" className="profile-button">
            <Avatar src={currentUser.avatar} size="small" style={{ marginRight: 8 }} />
            {currentUser.name}
          </Button>
        </Dropdown>
      </Header>
      <Content className="dashboard-content">
        <Outlet />
      </Content>
    </Layout>
  );
};