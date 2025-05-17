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
import { Badge } from "@/components/ui/badge";

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
    <div className="bg-gradient-to-b from-violet-50 to-white">
      <div className="container max-w-6xl p-4 md:p-8 mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Billing
            </h1>
            <p className="text-slate-500">
              Manage your subscription and payment methods
            </p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 shadow-md">
            <Link href="/billing/plans">Upgrade Plan</Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Current Subscription Card */}
          <Card className="border-0 shadow-md bg-white overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Current Subscription
                <Badge className="ml-2 bg-emerald-500 text-white hover:bg-emerald-600">
                  {subscription.status}
                </Badge>
              </CardTitle>
              <CardDescription>
                Your active plan and billing details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Plan
                  </p>
                  <p className="text-lg font-bold text-indigo-600">
                    {subscription.plan}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Next Renewal
                  </p>
                  <p className="font-medium">{subscription.renewalDate}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 col-span-2">
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Amount
                  </p>
                  <p className="text-lg font-bold">
                    <span className="text-indigo-600">
                      {subscription.amount}
                    </span>
                    <span className="text-slate-500 text-sm">
                      /{subscription.billingCycle}
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4 bg-slate-50">
              <Button
                variant="outline"
                className="border-slate-200 hover:bg-slate-100"
                asChild
              >
                <Link href="/billing/history">View History</Link>
              </Button>
              <Button
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
                asChild
              >
                <Link href="/billing/plans">Change Plan</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Payment Method Card */}
          <Card className="border-0 shadow-md bg-white overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 to-sky-500" />
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Your current payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-sky-500 text-white p-2">
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
                    className="h-8 w-8"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">
                    •••• •••• •••• {paymentMethod.last4}
                  </p>
                  <p className="text-sm text-slate-500">
                    Expires {paymentMethod.expiryDate}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 bg-slate-50">
              <Button
                variant="outline"
                className="w-full border-slate-200 hover:bg-slate-100"
              >
                Update Payment Method
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="invoices" className="w-full mt-8">
          <TabsList className="w-full max-w-md grid grid-cols-2 p-1 bg-slate-100 rounded-lg">
            <TabsTrigger
              value="invoices"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-600"
            >
              Recent Invoices
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-600"
            >
              Usage
            </TabsTrigger>
          </TabsList>
          <TabsContent value="invoices" className="space-y-4 pt-6">
            <Card className="border-0 shadow-md bg-white overflow-hidden">
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>
                  View and download your recent invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-4 text-sm font-medium text-slate-500 px-4 py-2">
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y divide-slate-100 rounded-lg overflow-hidden bg-slate-50">
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
                        className="grid grid-cols-4 items-center p-4 text-sm hover:bg-slate-100 transition-colors"
                      >
                        <div>{invoice.date}</div>
                        <div className="font-medium">{invoice.amount}</div>
                        <div>
                          <Badge
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 border-emerald-200"
                          >
                            {invoice.status}
                          </Badge>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4 bg-slate-50">
                <Button
                  variant="outline"
                  className="w-full border-slate-200 hover:bg-slate-100"
                  asChild
                >
                  <Link href="/billing/history">View All Invoices</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="usage" className="space-y-4 pt-6">
            <Card className="border-0 shadow-md bg-white overflow-hidden">
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>Monitor your resource usage</CardDescription>
              </CardHeader>
              <CardContent className="px-6 py-6">
                <div className="space-y-6">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium">Projects</span>
                      <span className="text-sm text-slate-500 font-medium">
                        8 / 10
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium">Storage</span>
                      <span className="text-sm text-slate-500 font-medium">
                        4.2GB / 10GB
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div className="h-2 w-2/5 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium">API Calls</span>
                      <span className="text-sm text-slate-500 font-medium">
                        87K / 100K
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div className="h-2 w-[87%] rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4 bg-slate-50">
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0">
                  View Detailed Usage
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
