"use client";

import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";
import { useState } from "react";

// export const metadata = {
//   title: "Subscription Plans",
//   description: "Choose the right subscription plan for your needs",
// };

export default function BillingPlansPage() {
  const [billingInterval, setBillingInterval] = useState("monthly");

  // In a real app, you'd fetch this data from your backend
  const currentPlan = "pro";

  const plans = {
    monthly: [
      {
        id: "free",
        name: "Free",
        description: "For hobbyists and beginners",
        price: "$0",
        priceDetails: "forever",
        features: [
          "3 projects",
          "Basic components",
          "1 GB storage",
          "Community support",
        ],
        limitations: [
          "No custom domains",
          "Watermarked exports",
          "No collaboration features",
        ],
        cta: "Current Plan",
        disabled: false,
      },
      {
        id: "basic",
        name: "Basic",
        description: "For individuals and small projects",
        price: "$19.99",
        priceDetails: "per month",
        features: [
          "10 projects",
          "All components",
          "5 GB storage",
          "Custom domains",
          "Remove watermarks",
          "Email support",
        ],
        limitations: ["Limited collaboration", "Basic analytics"],
        cta: "Upgrade",
        disabled: false,
      },
      {
        id: "pro",
        name: "Pro",
        popular: true,
        description: "For professionals and teams",
        price: "$24.99",
        priceDetails: "per month",
        features: [
          "Unlimited projects",
          "All components + premium",
          "20 GB storage",
          "Custom domains",
          "Remove watermarks",
          "Advanced analytics",
          "Team collaboration",
          "Priority support",
          "API access",
        ],
        limitations: [],
        cta: "Current Plan",
        disabled: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "For large organizations",
        price: "Custom",
        priceDetails: "contact sales",
        features: [
          "Unlimited everything",
          "Dedicated support manager",
          "Custom integrations",
          "SLA guarantees",
          "Advanced security",
          "Team training",
          "Custom branding",
        ],
        limitations: [],
        cta: "Contact Sales",
        disabled: false,
      },
    ],
    yearly: [
      {
        id: "free",
        name: "Free",
        description: "For hobbyists and beginners",
        price: "$0",
        priceDetails: "forever",
        features: [
          "3 projects",
          "Basic components",
          "1 GB storage",
          "Community support",
        ],
        limitations: [
          "No custom domains",
          "Watermarked exports",
          "No collaboration features",
        ],
        cta: "Current Plan",
        disabled: false,
      },
      {
        id: "basic",
        name: "Basic",
        description: "For individuals and small projects",
        price: "$199.99",
        priceDetails: "per year (save $40)",
        features: [
          "10 projects",
          "All components",
          "5 GB storage",
          "Custom domains",
          "Remove watermarks",
          "Email support",
        ],
        limitations: ["Limited collaboration", "Basic analytics"],
        cta: "Upgrade",
        disabled: false,
      },
      {
        id: "pro",
        name: "Pro",
        popular: true,
        description: "For professionals and teams",
        price: "$249.99",
        priceDetails: "per year (save $50)",
        features: [
          "Unlimited projects",
          "All components + premium",
          "20 GB storage",
          "Custom domains",
          "Remove watermarks",
          "Advanced analytics",
          "Team collaboration",
          "Priority support",
          "API access",
        ],
        limitations: [],
        cta: "Current Plan",
        disabled: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "For large organizations",
        price: "Custom",
        priceDetails: "contact sales",
        features: [
          "Unlimited everything",
          "Dedicated support manager",
          "Custom integrations",
          "SLA guarantees",
          "Advanced security",
          "Team training",
          "Custom branding",
        ],
        limitations: [],
        cta: "Contact Sales",
        disabled: false,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-violet-50 to-white">
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto p-6 md:p-8">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/billing"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Billing
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Subscription Plans
            </h1>
            <p className="text-gray-500">
              Choose the right plan for your needs
            </p>
          </div>

          <div className="mb-12">
            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1 bg-gray-100 rounded-full">
                <button
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                    billingInterval === "monthly"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setBillingInterval("monthly")}
                >
                  Monthly Billing
                </button>
                <button
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                    billingInterval === "yearly"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setBillingInterval("yearly")}
                >
                  Yearly Billing
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {(plans as any)[billingInterval].map((plan: any) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden flex flex-col ${
                    plan.popular
                      ? "border-2 border-blue-500"
                      : "border border-gray-100"
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-blue-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 text-center">
                      Popular
                    </div>
                  )}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {plan.name}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-800">
                        {plan.price}
                      </span>
                      {plan.priceDetails && (
                        <span className="ml-2 text-sm text-gray-500">
                          {plan.priceDetails}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex-grow">
                    <div className="space-y-5">
                      <h4 className="text-sm font-medium text-gray-800">
                        What&apos;s included:
                      </h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature: any, index: any) => (
                          <li key={index} className="flex items-start">
                            <Check className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {plan.limitations.length > 0 && (
                        <>
                          <h4 className="text-sm font-medium text-gray-800 pt-2">
                            Limitations:
                          </h4>
                          <ul className="space-y-3">
                            {plan.limitations.map(
                              (limitation: any, index: any) => (
                                <li
                                  key={index}
                                  className="flex items-center text-sm text-gray-500"
                                >
                                  <span className="mr-2 text-gray-400">•</span>
                                  <span>{limitation}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-100">
                    <button
                      className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors ${
                        plan.id === currentPlan
                          ? "bg-gray-100 text-gray-800"
                          : plan.id === "enterprise"
                            ? "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      disabled={plan.disabled}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-12 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Frequently Asked Questions
                </h2>
                <HelpCircle className="ml-2 h-5 w-5 text-blue-500" />
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              <div className="p-6">
                <h3 className="font-medium text-gray-800 mb-2">
                  Can I change my plan later?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes take effect at the start of your next billing cycle.
                </p>
              </div>

              <div className="p-6">
                <h3 className="font-medium text-gray-800 mb-2">
                  What happens to my projects if I downgrade?
                </h3>
                <p className="text-gray-600 text-sm">
                  If you downgrade to a plan with fewer projects than you
                  currently have, your newest projects will be archived until
                  you&apos;re within the plan limits.
                </p>
              </div>

              <div className="p-6">
                <h3 className="font-medium text-gray-800 mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-600 text-sm">
                  We offer a 30-day money-back guarantee for first-time
                  subscribers. For other refund requests, please contact our
                  support team.
                </p>
              </div>

              <div className="p-6">
                <h3 className="font-medium text-gray-800 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600 text-sm">
                  We accept major credit cards, PayPal, and bank transfers for
                  enterprise customers.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
                View All FAQs
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-100 p-8 mb-8 text-center flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
              <HelpCircle className="h-8 w-8" />
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Need help choosing a plan?
              </h3>
              <p className="text-gray-600">
                Our team can help you find the right plan for your needs.
              </p>
            </div>
            <button className="px-6 py-2.5 bg-white border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
