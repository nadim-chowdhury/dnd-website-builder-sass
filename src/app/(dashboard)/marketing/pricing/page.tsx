"use client";

import { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
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
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Pricing Plans</h1>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
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
            <TabsList className="grid grid-cols-2 w-64">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <Badge
                  variant="secondary"
                  className="ml-2 bg-green-100 text-green-800 hover:bg-green-100"
                >
                  Save up to 20%
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
            className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-0 right-0 flex justify-center">
                <Badge className="bg-blue-500">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <p className="text-gray-500">{plan.description}</p>
              <div className="mt-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                    $
                    {billingCycle === "monthly"
                      ? plan.price.monthly
                      : plan.price.yearly}
                  </span>
                  <span className="text-gray-500 ml-1">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "yearly" && plan.price.monthly > 0 && (
                  <p className="text-sm text-green-600 mt-1">
                    Save {calculateSavings(plan)}% with annual billing
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium">What's included:</p>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                      {feature.included ? (
                        <div className="rounded-full bg-green-100 text-green-600 p-0.5">
                          <Check className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="rounded-full bg-gray-100 text-gray-400 p-0.5">
                          <span className="block h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <span
                      className={`ml-2 ${feature.included ? "" : "text-gray-500"}`}
                    >
                      {feature.name}
                      {feature.tooltip && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="inline h-3.5 w-3.5 ml-1 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>{feature.tooltip}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.buttonVariant}>
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 border rounded-xl p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6">
          <div>
            <h3 className="font-medium mb-2">
              Can I upgrade or downgrade my plan later?
            </h3>
            <p className="text-gray-600">
              Yes, you can change your plan at any time. When upgrading, you'll
              be prorated the difference. When downgrading, the new rate starts
              at your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Do you offer a free trial?</h3>
            <p className="text-gray-600">
              We offer a free plan that you can use indefinitely. It includes
              basic features so you can try out our platform before committing
              to a paid plan.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600">
              We accept all major credit cards including Visa, Mastercard,
              American Express, and Discover. We also support PayPal payments.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I cancel my subscription?</h3>
            <p className="text-gray-600">
              Yes, you can cancel your subscription at any time. You'll continue
              to have access to your paid features until the end of your billing
              period.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-3">Need something different?</h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto">
          Contact our sales team for custom pricing options and enterprise
          solutions tailored to your specific requirements.
        </p>
        <Button size="lg">Contact Sales</Button>
      </div>
    </div>
  );
}
