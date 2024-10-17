import { registerSchema } from "@/constants/formSchema";
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
import { useAuthRegisterMutation } from "@/app/services/auth";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [authRegister, { isLoading }] = useAuthRegisterMutation();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "https://picsum.photos/800",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    authRegister(values)
      .unwrap()
      .then(() => {
        toast.success("Registered successfully");
        navigate("/auth/login");
      })
      .catch((error) => {
        toast.error(error.data.detail);
      });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
        <CardDescription>Sign Up to Get Started</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[300px] space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Input Your Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>Already have an account?</p>
        <Link
          to="/auth/login"
          className="pl-1 text-primary hover:underline transition-all">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
};
export default RegisterForm;
