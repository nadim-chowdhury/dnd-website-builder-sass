"use client";

import { useState } from "react";
import { Check, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

// Types for our pricing plans
interface PricingFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  popular?: boolean;
  color: {
    light: string;
    accent: string;
    text: string;
  };
  price: {
    monthly: number;
    yearly: number;
  };
  features: PricingFeature[];
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary";
}

// Our pricing plans data
const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out our website builder",
    color: {
      light: "bg-gray-100",
      accent: "bg-gray-200",
      text: "text-gray-700",
    },
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      { name: "Up to 3 websites", included: true },
      { name: "Basic components", included: true },
      { name: "Community support", included: true },
      { name: "Custom domain", included: false },
      { name: "Remove branding", included: false },
      { name: "Advanced components", included: false },
      { name: "API access", included: false },
      { name: "Team collaboration", included: false },
      { name: "Export website code", included: false },
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals and small businesses",
    popular: true,
    color: {
      light: "bg-indigo-100",
      accent: "bg-indigo-500",
      text: "text-indigo-700",
    },
    price: {
      monthly: 19,
      yearly: 190,
    },
    features: [
      { name: "Unlimited websites", included: true },
      { name: "All basic components", included: true },
      { name: "Premium support", included: true },
      { name: "Custom domain", included: true },
      { name: "Remove branding", included: true },
      { name: "Advanced components", included: true },
      {
        name: "API access",
        included: false,
        tooltip: "Access to our API for programmatic control",
      },
      {
        name: "Team collaboration",
        included: false,
        tooltip: "Work together with your team members",
      },
      {
        name: "Export website code",
        included: false,
        tooltip: "Download the HTML, CSS, and JavaScript",
      },
    ],
    buttonText: "Subscribe Now",
    buttonVariant: "default",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large teams and organizations",
    color: {
      light: "bg-purple-100",
      accent: "bg-purple-500",
      text: "text-purple-700",
    },
    price: {
      monthly: 49,
      yearly: 490,
    },
    features: [
      { name: "Unlimited websites", included: true },
      { name: "All components", included: true },
      { name: "Priority support", included: true },
      { name: "Custom domain", included: true },
      { name: "Remove branding", included: true },
      { name: "Advanced components", included: true },
      {
        name: "API access",
        included: true,
        tooltip: "Access to our API for programmatic control",
      },
      {
        name: "Team collaboration",
        included: true,
        tooltip: "Work together with your team members",
      },
      {
        name: "Export website code",
        included: true,
        tooltip: "Download the HTML, CSS, and JavaScript",
      },
    ],
    buttonText: "Contact Sales",
    buttonVariant: "secondary",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const calculateSavings = (plan: PricingPlan) => {
    const monthlyTotal = plan.price.monthly * 12;
    const yearlyCost = plan.price.yearly;
    const savings = monthlyTotal - yearlyCost;
    const savingsPercentage = Math.round((savings / monthlyTotal) * 100);
    return savingsPercentage;
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="mb-6 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-600 font-medium">
            Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Pricing
            </span>
          </h1>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include our
            drag-and-drop builder, hosting, and access to customer support.
          </p>

          <div className="flex justify-center mb-8">
            <Tabs
              defaultValue="monthly"
              value={billingCycle}
              onValueChange={(value) =>
                setBillingCycle(value as "monthly" | "yearly")
              }
              className="inline-flex"
            >
              <TabsList className="grid grid-cols-2 w-72 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger
                  value="monthly"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Yearly
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-green-100 text-green-600 hover:bg-green-100"
                  >
                    Save 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden bg-white ${
                plan.popular ? "shadow-lg ring-2 ring-indigo-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-3 -right-12 rotate-45 w-36 bg-indigo-500 text-white text-xs py-1 text-center font-medium">
                  Popular
                </div>
              )}
              <div className={`h-2 w-full ${plan.color.accent}`}></div>
              <CardHeader className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className={`p-2 rounded-full ${plan.color.light}`}>
                    <Sparkles className={`h-4 w-4 ${plan.color.text}`} />
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{plan.description}</p>
                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">
                      {plan.price[billingCycle] === 0
                        ? "Free"
                        : `$${plan.price[billingCycle]}`}
                    </span>
                    {plan.price[billingCycle] > 0 && (
                      <span className="text-gray-500 ml-2 text-sm">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </div>
                  {billingCycle === "yearly" && plan.price.monthly > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      Save {calculateSavings(plan)}% with annual billing
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="h-px bg-gray-100 w-full"></div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5">
                        {feature.included ? (
                          <div
                            className={`rounded-full ${plan.id === "pro" ? "bg-indigo-100 text-indigo-600" : plan.id === "enterprise" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"} p-0.5`}
                          >
                            <Check className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="rounded-full bg-gray-100 text-gray-400 p-0.5">
                            <span className="block h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <span
                        className={`ml-3 text-sm ${feature.included ? "" : "text-gray-400"}`}
                      >
                        {feature.name}
                        {feature.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="inline h-3.5 w-3.5 ml-1 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-800 text-white">
                                {feature.tooltip}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.buttonVariant}
                  style={{
                    backgroundColor:
                      plan.id === "pro"
                        ? "#4f46e5"
                        : plan.id === "enterprise"
                          ? "#8b5cf6"
                          : "",
                    borderColor: plan.id === "free" ? "#d1d5db" : "",
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-600 font-medium">
              Questions?
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Everything you need to know about our plans and pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3 text-lg">
                Can I upgrade or downgrade my plan later?
              </h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. When upgrading,
                you&apos;ll be prorated the difference. When downgrading, the
                new rate starts at your next billing cycle.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3 text-lg">
                Do you offer a free trial?
              </h3>
              <p className="text-gray-600">
                We offer a free plan that you can use indefinitely. It includes
                basic features so you can try out our platform before committing
                to a paid plan.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3 text-lg">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards including Visa, Mastercard,
                American Express, and Discover. We also support PayPal payments.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3 text-lg">
                Can I cancel my subscription?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You&apos;ll
                continue to have access to your paid features until the end of
                your billing period.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-12 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="mb-8 max-w-xl mx-auto opacity-90">
            Our enterprise solutions can be tailored to your organization&apos;s
            specific needs. Get in touch with our sales team to discuss custom
            requirements.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-gray-100 text-indigo-600"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
}
