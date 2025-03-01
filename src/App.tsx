import { ConfigProvider } from "antd";
import AppRoutes from "@/routes/AppRoutes";
import { Provider as ReduxProvider } from "react-redux";
import { AuthProvider } from "@/contexts/AuthContext";
import reduxStore from "@/redux";

export default function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1890ff" } }}>
      <ReduxProvider store={reduxStore}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ReduxProvider>
    </ConfigProvider>
  );
}