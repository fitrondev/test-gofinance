import { RootState } from "@/app/store";
import DashboardHeader from "@/components/layouts/Dashboard/DashboardHeader";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  );
};
export default DashboardLayout;
