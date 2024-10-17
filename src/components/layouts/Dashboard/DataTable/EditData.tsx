import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateTransactionMutation } from "@/app/services/transaction";
import { toast } from "react-toastify";
import { editSchema } from "@/constants/formSchema";

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// icons
import { Pencil } from "lucide-react";

type Transaction = {
  id: string;
  item: string;
  price: string;
  date: string;
  status: boolean;
};

interface EditDataProps {
  transaction: Transaction;
  refetch: () => void;
}

const EditData = ({ transaction, refetch }: EditDataProps) => {
  const [updateTransaction] = useUpdateTransactionMutation();

  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      item: transaction.item,
      price: transaction.price,
      date: transaction.date,
      status: transaction.status,
    },
  });

  function onSubmit(values: z.infer<typeof editSchema>) {
    try {
      updateTransaction({
        id: transaction.id,
        ...values,
      }).unwrap();
      refetch();
      toast.success("Transaction updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update transaction");
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Pencil className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Update the transaction details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item</FormLabel>
                  <FormControl>
                    <Input placeholder={transaction.item} {...field} />
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
                      placeholder={transaction.price.toString()}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder={transaction.date}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormLabel>{field.value ? "Paid" : "Unpaid"}</FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit">Edit Data</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditData;
