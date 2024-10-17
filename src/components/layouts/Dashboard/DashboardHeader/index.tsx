import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/app/features/auth/authSlice";
import { toast } from "react-toastify";
import { useGetProfileQuery } from "@/app/services/auth";
// import Profile from "../Profile";
import ProfileData from "@/pages/ProfileData";

const DashboardHeader = () => {
  const { data: user, isLoading } = useGetProfileQuery({});

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutBtn = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  return (
    <header className="bg-primary">
      <div className="container h-16 flex items-center justify-between text-white">
        <Link to="/" className="text-2xl font-bold">
          GoFinance
        </Link>

        <div>
          {isAuthenticated && user && (
            <div className="flex items-center gap-4">
              <ProfileData user={user} />

              <Button variant={"destructive"} onClick={logoutBtn}>
                Logout
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse" />
              <div className="h-10 w-20 bg-gray-300 rounded-full animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
