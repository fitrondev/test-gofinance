import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/app/features/auth/authSlice";
import { toast } from "react-toastify";

// ui
import { Button } from "@/components/ui/button";

const Header = () => {
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
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button variant={"secondary"} asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant={"destructive"} onClick={logoutBtn}>
                Log Out
              </Button>
            </div>
          ) : (
            <Button variant={"secondary"} asChild>
              <Link to="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
