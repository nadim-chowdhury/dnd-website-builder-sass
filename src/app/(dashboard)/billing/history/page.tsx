"use client";

import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Download, FileText } from "lucide-react";
import { useState } from "react";

// export const metadata = {
//   title: "Billing History",
//   description: "View your complete billing history and download invoices",
// };

export default function BillingHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
    <div className="bg-gradient-to-b from-violet-50 to-white">
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto p-6 md:p-8">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/dashboard/billing"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Billing
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Billing History
            </h1>
            <p className="text-gray-500">
              View and download your past invoices and payment history
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Invoices
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Complete history of your billing
                </p>
              </div>
              <button className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Calendar className="mr-2 h-4 w-4" />
                Filter by Date
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {invoice.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${
                              invoice.status === "Paid"
                                ? "bg-green-500"
                                : invoice.status === "Pending"
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                          />
                          <span className="text-sm text-gray-600">
                            {invoice.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="ml-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                          <Download className="h-4 w-4 inline mr-1" />
                          Download
                        </button>
                        <button className="ml-4 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                          <FileText className="h-4 w-4 inline mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="text-sm text-gray-500">
                Showing {invoices.length} of {invoices.length} invoices
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-white border border-gray-200 rounded text-sm font-medium text-gray-400 cursor-not-allowed"
                  disabled
                >
                  Previous
                </button>
                <button
                  className="px-3 py-1 bg-white border border-gray-200 rounded text-sm font-medium text-gray-400 cursor-not-allowed"
                  disabled
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">
                Payment Methods History
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                History of your payment method changes
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
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
                    <p className="font-medium text-gray-800">
                      •••• •••• •••• 4242
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                        Current
                      </span>
                      Added on April 2, 2025
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
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
                      <p className="font-medium text-gray-800">
                        •••• •••• •••• 5678
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                          Expired
                        </span>
                        Removed on April 2, 2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
