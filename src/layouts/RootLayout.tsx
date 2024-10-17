import Header from "@/components/layouts/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default RootLayout;
