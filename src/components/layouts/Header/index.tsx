import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary">
      <div className="container h-16 flex items-center justify-between text-white">
        <Link to="/" className="text-2xl font-bold">
          GoFinance
        </Link>

        <div>
          <Button variant={"secondary"} asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Header;
