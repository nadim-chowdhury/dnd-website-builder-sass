import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckoutProps {
  subtotal?: number;
  tax?: number;
  shipping?: number;
  total?: number;
  currency?: string;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Checkout({
  subtotal = 79.98,
  tax = 7.99,
  shipping = 4.99,
  total = 92.96,
  currency = "USD",
  onSubmit,
  onCancel,
  className = "",
  style,
}: CheckoutProps) {
  const [activeTab, setActiveTab] = useState("customer-info");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      // In a real implementation, collect form data here
      onSubmit({});
    }
  };

  return (
    <Card className={`checkout-container ${className}`} style={style}>
      <CardHeader>
        <h2 className="text-2xl font-bold">Checkout</h2>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customer-info">Customer Info</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="customer-info" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="(123) 456-7890" />
              </div>

              <div className="flex justify-end mt-6">
                <Button type="button" onClick={() => setActiveTab("shipping")}>
                  Continue to Shipping
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apartment">
                  Apartment, suite, etc. (optional)
                </Label>
                <Input id="apartment" placeholder="Apt 4B" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="NY" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input id="zipCode" placeholder="10001" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="United States" required />
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <Label>Shipping Method</Label>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">
                        Standard Shipping (3-5 business days)
                      </Label>
                    </div>
                    <span>{formatPrice(4.99)}</span>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express">
                        Express Shipping (1-2 business days)
                      </Label>
                    </div>
                    <span>{formatPrice(12.99)}</span>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("customer-info")}
                >
                  Back
                </Button>
                <Button type="button" onClick={() => setActiveTab("payment")}>
                  Continue to Payment
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="John Doe" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required />
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox id="saveCard" />
                <Label htmlFor="saveCard">Save card for future purchases</Label>
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("shipping")}
                >
                  Back
                </Button>
                <Button type="submit">Complete Order</Button>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
