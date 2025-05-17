import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Download, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Billing History",
  description: "View your complete billing history and download invoices",
};

export default function BillingHistoryPage() {
  // In a real app, you'd fetch this data from your backend
  const invoices = [
    {
      id: "INV-2025-042",
      date: "April 17, 2025",
      amount: "$24.99",
      status: "Paid",
      items: [{ name: "Pro Plan (Monthly)", amount: "$24.99" }],
    },
    {
      id: "INV-2025-031",
      date: "March 17, 2025",
      amount: "$24.99",
      status: "Paid",
      items: [{ name: "Pro Plan (Monthly)", amount: "$24.99" }],
    },
    {
      id: "INV-2025-022",
      date: "February 17, 2025",
      amount: "$24.99",
      status: "Paid",
      items: [{ name: "Pro Plan (Monthly)", amount: "$24.99" }],
    },
    {
      id: "INV-2025-011",
      date: "January 17, 2025",
      amount: "$24.99",
      status: "Paid",
      items: [{ name: "Pro Plan (Monthly)", amount: "$24.99" }],
    },
    {
      id: "INV-2024-127",
      date: "December 17, 2024",
      amount: "$24.99",
      status: "Paid",
      items: [{ name: "Pro Plan (Monthly)", amount: "$24.99" }],
    },
    {
      id: "INV-2024-116",
      date: "November 17, 2024",
      amount: "$24.99",
      status: "Paid",
      items: [{ name: "Pro Plan (Monthly)", amount: "$24.99" }],
    },
    {
      id: "INV-2024-105",
      date: "October 17, 2024",
      amount: "$19.99",
      status: "Paid",
      items: [{ name: "Basic Plan (Monthly)", amount: "$19.99" }],
    },
    {
      id: "INV-2024-090",
      date: "September 17, 2024",
      amount: "$19.99",
      status: "Paid",
      items: [{ name: "Basic Plan (Monthly)", amount: "$19.99" }],
    },
  ];

  return (
    <div className="container max-w-6xl space-y-8 p-4 md:p-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/billing">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Billing
          </Link>
        </Button>
      </div>

      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Billing History</h1>
        <p className="text-muted-foreground">
          View and download your past invoices and payment history
        </p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Your Invoices</CardTitle>
            <CardDescription>Complete history of your billing</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Filter by Date
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          invoice.status === "Paid"
                            ? "bg-green-500"
                            : invoice.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <span>{invoice.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing 8 of 8 invoices
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods History</CardTitle>
          <CardDescription>
            History of your payment method changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">
                  Added on April 2, 2025 • Current
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 5678</p>
                <p className="text-sm text-muted-foreground">
                  Removed on April 2, 2025 • Expired
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
