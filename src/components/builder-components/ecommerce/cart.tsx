import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageSrc?: string;
  options?: Record<string, string>;
}

interface CartProps {
  items?: CartItem[];
  currency?: string;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onClearCart?: () => void;
  onCheckout?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const defaultItems: CartItem[] = [
  {
    id: "product-1",
    title: "Example Product 1",
    price: 49.99,
    quantity: 1,
    imageSrc: "/api/placeholder/60/60",
  },
  {
    id: "product-2",
    title: "Example Product 2",
    price: 29.99,
    quantity: 2,
    imageSrc: "/api/placeholder/60/60",
    options: {
      Size: "Medium",
      Color: "Blue",
    },
  },
];

export default function Cart({
  items = defaultItems,
  currency = "USD",
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  className = "",
  style,
}: CartProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax as an example
  const total = subtotal + tax;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) newQuantity = 1;
    if (onUpdateQuantity) onUpdateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    if (onRemoveItem) onRemoveItem(id);
  };

  return (
    <Card className={`cart-container ${className}`} style={style}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          {items.length > 0 && (
            <Button variant="outline" size="sm" onClick={onClearCart}>
              Clear Cart
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-64 pr-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-3">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.imageSrc || "/api/placeholder/60/60"}
                      alt={item.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    {item.options && Object.keys(item.options).length > 0 && (
                      <div className="mt-1 text-sm text-gray-500">
                        {Object.entries(item.options).map(([key, value]) => (
                          <span key={key} className="mr-3">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="h-8 w-12 mx-1 text-center"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 h-8"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button className="w-full mt-4" size="lg" onClick={onCheckout}>
              Proceed to Checkout
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
