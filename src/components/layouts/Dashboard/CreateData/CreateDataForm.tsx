import { useCreateTransactionMutation } from "@/app/services/transaction";
import { createSchema } from "@/constants/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

const CreateDataForm = () => {
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      item: "",
      price: "",
      status: false,
    },
  });

  function onSubmit(values: z.infer<typeof createSchema>) {
    try {
      createTransaction(values);
      toast.success("Transaction created successfully");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create transaction");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:w-[500px] space-y-4 border p-4 rounded-lg shadow-lg">
        <FormField
          control={form.control}
          name="item"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Input Item Name" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step={0.01}
                  min={0}
                  required
                  placeholder={"Input Price"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default CreateDataForm;
