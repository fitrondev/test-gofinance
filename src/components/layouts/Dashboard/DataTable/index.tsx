import { useState } from "react";
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
import { Pencil, Trash2 } from "lucide-react";

type Transaction = {
  id: string;
  item: string;
  price: number;
  date: string;
  status: string;
};

const initialTransactions: Transaction[] = [
  {
    id: "1",
    item: "Lorem ipsum Dolor S...",
    price: 89.94,
    date: "31/12/2022",
    status: "Lorem ipsum",
  },
  {
    id: "2",
    item: "Lorem ipsum Dolor S...",
    price: 89.94,
    date: "31/12/2022",
    status: "Lorem ipsum",
  },
  {
    id: "3",
    item: "Lorem ipsum Dolor S...",
    price: 89.94,
    date: "31/12/2022",
    status: "Lorem ipsum",
  },
  {
    id: "4",
    item: "Lorem ipsum Dolor S...",
    price: 89.94,
    date: "31/12/2022",
    status: "Lorem ipsum",
  },
  {
    id: "5",
    item: "Lorem ipsum Dolor S...",
    price: 89.94,
    date: "31/12/2022",
    status: "Lorem ipsum",
  },
];

export default function DataTable() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    setSelectedTransactions(
      selectedTransactions.filter((selectedId) => selectedId !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(filteredTransactions.map((t) => t.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTransactions([...selectedTransactions, id]);
    } else {
      setSelectedTransactions(
        selectedTransactions.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const isAllSelected =
    filteredTransactions.length > 0 &&
    selectedTransactions.length === filteredTransactions.length;

  return (
    <div className="container bg-gray-100 mt-10 p-4 rounded-lg">
      <Input
        className="mb-4"
        placeholder="Search Transaction"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Checkbox
                  checked={selectedTransactions.includes(transaction.id)}
                  onCheckedChange={(checked) =>
                    handleSelectTransaction(transaction.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell>{transaction.item}</TableCell>
              <TableCell>${transaction.price.toFixed(2)}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(transaction.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
