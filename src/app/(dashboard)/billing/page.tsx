import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Billing & Subscription",
  description: "Manage your billing settings and subscription plans",
};

export default function BillingPage() {
  // In a real app, you'd fetch this data from your backend
  const subscription = {
    status: "active",
    plan: "Pro",
    renewalDate: "June 17, 2025",
    amount: "$24.99",
    billingCycle: "monthly",
  };

  const paymentMethod = {
    type: "credit-card",
    last4: "4242",
    expiryDate: "04/26",
    name: "John Doe",
  };

  return (
    <div className="container max-w-6xl space-y-8 p-4 md:p-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and payment methods
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Subscription Card */}
        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>
              Your active plan and billing details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Plan
                </p>
                <p className="text-lg font-bold">{subscription.plan}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Status
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="capitalize">{subscription.status}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Next Renewal
                </p>
                <p>{subscription.renewalDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Amount
                </p>
                <p>
                  {subscription.amount}/{subscription.billingCycle}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/billing/history">View History</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/billing/plans">Change Plan</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Payment Method Card */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Your current payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border bg-card p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <div>
                <p className="font-medium">
                  •••• •••• •••• {paymentMethod.last4}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expires {paymentMethod.expiryDate}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Update Payment Method
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="invoices">Recent Invoices</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>
                View and download your recent invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y divide-border rounded-lg border">
                  {[
                    {
                      date: "April 17, 2025",
                      amount: "$24.99",
                      status: "Paid",
                    },
                    {
                      date: "March 17, 2025",
                      amount: "$24.99",
                      status: "Paid",
                    },
                    {
                      date: "February 17, 2025",
                      amount: "$24.99",
                      status: "Paid",
                    },
                  ].map((invoice, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 items-center p-4 text-sm"
                    >
                      <div>{invoice.date}</div>
                      <div>{invoice.amount}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span>{invoice.status}</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/billing/history">View All Invoices</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="usage" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>Monitor your resource usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Projects</span>
                    <span className="text-sm text-muted-foreground">
                      8 / 10
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-4/5 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Storage</span>
                    <span className="text-sm text-muted-foreground">
                      4.2GB / 10GB
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-2/5 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">API Calls</span>
                    <span className="text-sm text-muted-foreground">
                      87K / 100K
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[87%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
