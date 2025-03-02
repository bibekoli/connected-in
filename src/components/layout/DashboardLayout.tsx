import { useSelector } from "react-redux";
import { Layout, Menu, Dropdown, Avatar, Button, Drawer } from "antd";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardOutlined, MessageOutlined, SettingOutlined, MenuOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import "./DashboardLayout.css";

const { Header, Content } = Layout;

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();
  const currentUser = useSelector((state: ReduxState) => state.currentUser);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const menuItems = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/chats", icon: <MessageOutlined />, label: "Chats" },
    { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
    { key: "/profile", icon: null, label: "Profile" },
    {
      key: "logout",
      icon: null,
      label: "Logout",
      onClick: async () => {
        await logout();
        navigate("/login");
        setDrawerVisible(false);
      }
    },
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Header className="dashboard-header">
        <Link to="/dashboard" className="header-title">
          <div className="header-logo">
            <img src="/logo.svg" alt="ConnectedIn" style={{ height: 40 }} />
          </div>
        </Link>
        {
          isMobile ? (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleDrawer}
              className="mobile-menu-button"
            />
          ) : (
            <>
              <Menu
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={menuItems.slice(0, 3)}
                onClick={({ key }) => navigate(key)}
                className="header-menu"
              />
              <Dropdown
                menu={{ items: profileMenuItems }}
                placement="bottomRight"
                trigger={["click"]}>
                <Button type="text" className="profile-button">
                  <Avatar src={currentUser.avatar} size="small" style={{ marginRight: 8 }} />
                  {currentUser.name}
                </Button>
              </Dropdown>
            </>
          )
        }
      </Header>

      {
        isMobile && (
          <Drawer
            title="Menu"
            placement="right"
            onClose={toggleDrawer}
            open={drawerVisible}
            width={250}>
            <Menu
              mode="vertical"
              selectedKeys={[location.pathname]}
              items={menuItems}
              onClick={({ key }) => {
                navigate(key);
                if (key !== "logout") setDrawerVisible(false);
              }}
            />
          </Drawer>
        )
        }

      <Content className="dashboard-content">
        <Outlet />
      </Content>
    </Layout>
  );
};