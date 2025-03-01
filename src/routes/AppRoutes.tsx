import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";
import ProfilePage from "@/pages/ProfilePage";
import RouteProgress from "@/components/RouteProgress";
import LandingPage from "@/pages/Landing";
import LoginPage from "@/pages/Login";
import SettingsPage from "@/pages/SettingsPage.index";
import ChatPage from "@/pages/ChatPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <RouteProgress />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="chats" element={<ChatPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
