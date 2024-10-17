import AuthLeft from "@/components/AuthLeft";
import LoginForm from "@/components/layouts/AuthForm/LoginForm";

const Login = () => {
  return (
    <section className="relative h-screen flex overflow-y-hidden">
      <AuthLeft />

      <div className="size-full lg:w-2/6 flex items-center justify-center">
        <LoginForm />
      </div>

      <div className="hidden lg:block absolute -left-[200px] top-[500px] size-[550px] bg-transparent border border-blue-500 rounded-full"></div>
      <div className="hidden lg:block absolute -left-[126px] top-[520px] size-[550px] bg-transparent border border-blue-500 rounded-full"></div>
    </section>
  );
};
export default Login;
