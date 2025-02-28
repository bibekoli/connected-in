import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/Landing";
import NotFoundPage from "@/pages/NotFoundPage";
import ChatPage from "@/pages/ChatPage";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import RouteProgress from "@/components/RouteProgress";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
    <RouteProgress />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};