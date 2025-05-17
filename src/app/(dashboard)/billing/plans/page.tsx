import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";

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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Subscription Plans",
  description: "Choose the right subscription plan for your needs",
};

export default function BillingPlansPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">
          Subscription Plans
        </h1>
        <p className="text-muted-foreground">
          Choose the right plan for your needs
        </p>
      </div>

      <Tabs defaultValue="monthly" className="space-y-8">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="yearly">Yearly Billing</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.monthly.map((plan) => (
              <Card
                key={plan.id}
                className={`flex flex-col ${plan.popular ? "border-primary" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.popular && <Badge variant="default">Popular</Badge>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.priceDetails && (
                        <span className="ml-2 text-sm text-muted-foreground">
                          {plan.priceDetails}
                        </span>
                      )}
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">What's included:</h4>
                    <ul className="space-y-2.5 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.limitations.length > 0 && (
                      <>
                        <h4 className="text-sm font-medium">Limitations:</h4>
                        <ul className="space-y-2.5 text-sm">
                          {plan.limitations.map((limitation, index) => (
                            <li
                              key={index}
                              className="flex items-center text-muted-foreground"
                            >
                              <span className="mr-2">•</span>
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.id === currentPlan ? "secondary" : "default"}
                    className="w-full"
                    disabled={plan.disabled}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="yearly" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.yearly.map((plan) => (
              <Card
                key={plan.id}
                className={`flex flex-col ${plan.popular ? "border-primary" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.popular && <Badge variant="default">Popular</Badge>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.priceDetails && (
                        <span className="ml-2 text-sm text-muted-foreground">
                          {plan.priceDetails}
                        </span>
                      )}
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">What's included:</h4>
                    <ul className="space-y-2.5 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.limitations.length > 0 && (
                      <>
                        <h4 className="text-sm font-medium">Limitations:</h4>
                        <ul className="space-y-2.5 text-sm">
                          {plan.limitations.map((limitation, index) => (
                            <li
                              key={index}
                              className="flex items-center text-muted-foreground"
                            >
                              <span className="mr-2">•</span>
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.id === currentPlan ? "secondary" : "default"}
                    className="w-full"
                    disabled={plan.disabled}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            Frequently Asked Questions
            <HelpCircle className="ml-2 h-4 w-4" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Can I change my plan later?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes
              take effect at the start of your next billing cycle.
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-medium">
              What happens to my projects if I downgrade?
            </h3>
            <p className="text-sm text-muted-foreground">
              If you downgrade to a plan with fewer projects than you currently
              have, your newest projects will be archived until you're within
              the plan limits.
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-medium">Do you offer refunds?</h3>
            <p className="text-sm text-muted-foreground">
              We offer a 30-day money-back guarantee for first-time subscribers.
              For other refund requests, please contact our support team.
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-medium">What payment methods do you accept?</h3>
            <p className="text-sm text-muted-foreground">
              We accept major credit cards, PayPal, and bank transfers for
              enterprise customers.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" className="w-full">
            View All FAQs
          </Button>
        </CardFooter>
      </Card>

      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Need help choosing a plan?</h3>
          <p className="text-muted-foreground">
            Our team can help you find the right plan for your needs.
          </p>
        </div>
        <Button variant="outline">Contact Sales</Button>
      </div>
    </div>
  );
}
