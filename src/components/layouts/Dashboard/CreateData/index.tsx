import CreateDataForm from "./CreateDataForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CreateData = () => {
  return (
    <section className="mt-10 h-[calc(100vh-104px)]">
      <div className="container">
        <div>
          <Button asChild>
            <Link to="/dashboard">
              <ArrowLeft /> Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="container h-[calc(100%-40px)] flex items-center justify-center">
        <CreateDataForm />
      </div>
    </section>
  );
};
export default CreateData;
