import { loginSchema } from "@/constants/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

// ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthLoginMutation } from "@/app/services/auth";
import { useDispatch } from "react-redux";
import { login } from "@/app/features/auth/authSlice";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [authLogin, { isLoading }] = useAuthLoginMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    authLogin(values)
      .unwrap()
      .then((data) => {
        dispatch(login(data.access_token));
        toast.success("Logged in successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello Again!</CardTitle>
        <CardDescription>Welcome Back</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[300px] space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Input Your Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Input Your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>Don't have an account?</p>
        <Link
          to="/auth/register"
          className="pl-1 text-primary hover:underline transition-all">
          Register
        </Link>
      </CardFooter>
    </Card>
  );
};
export default LoginForm;
