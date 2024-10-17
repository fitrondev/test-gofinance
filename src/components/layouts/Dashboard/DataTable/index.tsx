import { useState } from "react";
import { formatDate } from "@/lib/dateFormat";
import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from "@/app/services/transaction";

// components
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import EditData from "./EditData";

// icons
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

type Transaction = {
  id: string;
  item: string;
  price: string;
  date: string;
  status: boolean;
};

export default function DataTable() {
  const {
    data: transactions = [],
    refetch,
    isLoading: isFetching,
  } = useGetTransactionsQuery({});
  const [deleteTransaction, { isLoading }] = useDeleteTransactionMutation();

  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );

  const [searchTerm, setSearchTerm] = useState("");

  const isAllSelected = transactions.length === selectedTransactions.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(
        transactions.map((transaction: Transaction) => transaction.id)
      );
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTransactions([...selectedTransactions, id]);
    } else {
      setSelectedTransactions(selectedTransactions.filter((t) => t !== id));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id).unwrap();
      toast.success("Transaction deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const filteredTransactions = [...transactions]
    .sort((a, b) => {
      if (a.status === b.status) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.status ? -1 : 1;
    })
    .filter((transaction: Transaction) =>
      transaction.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container bg-gray-100 mt-10 p-4 rounded-lg">
      <Input
        className="mb-4"
        placeholder="Search Transaction"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        <Button asChild>
          <Link to="/dashboard/create">Add Data +</Link>
        </Button>
      </div>

      {isFetching ? ( // Show loading state while fetching
        <div className="flex justify-center items-center h-64">
          <span className="text-lg">Loading transactions...</span>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction: Transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTransactions.includes(transaction.id)}
                    onCheckedChange={(checked) =>
                      handleSelectTransaction(
                        transaction.id,
                        checked as boolean
                      )
                    }
                  />
                </TableCell>
                <TableCell>{transaction.item}</TableCell>
                <TableCell>${transaction.price}</TableCell>
                <TableCell>
                  {formatDate(new Date(transaction.date), "DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  {transaction.status === true ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <span className="text-red-500">Unpaid</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditData transaction={transaction} refetch={refetch} />
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isLoading}
                      onClick={() => handleDelete(transaction.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
