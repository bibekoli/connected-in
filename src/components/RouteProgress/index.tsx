import React, { useEffect } from "react";
import NProgress from "nprogress";
import { useLocation } from "react-router-dom";
import "nprogress/nprogress.css";
import "./RouteProgress.css";

const RouteProgress: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

  return null;
};

export default RouteProgress;