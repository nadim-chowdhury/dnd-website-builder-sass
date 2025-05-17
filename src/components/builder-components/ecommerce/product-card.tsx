import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  title: string;
  description?: string;
  price: number;
  salePrice?: number;
  currency?: string;
  imageSrc?: string;
  imageAlt?: string;
  badge?: string;
  onAddToCart?: (id: string) => void;
  onQuickView?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const defaultProps: Partial<ProductCardProps> = {
  title: "Product Title",
  description:
    "Product description goes here. This is where you can describe your product in detail.",
  price: 99.99,
  currency: "USD",
  imageSrc: "/api/placeholder/400/300",
  imageAlt: "Product image",
};

export default function ProductCard({
  id = "product-1",
  title = defaultProps.title,
  description = defaultProps.description,
  price = defaultProps.price,
  salePrice,
  currency = defaultProps.currency,
  imageSrc = defaultProps.imageSrc,
  imageAlt = defaultProps.imageAlt,
  badge,
  onAddToCart,
  onQuickView,
  className = "",
  style,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) onAddToCart(id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(id);
  };

  return (
    <Card
      className={`product-card overflow-hidden h-full ${className}`}
      style={style}
    >
      <div className="relative">
        {badge && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="secondary">{badge}</Badge>
          </div>
        )}
        <div className="aspect-square overflow-hidden bg-gray-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <CardHeader className="p-4 pb-0">
        <h3 className="text-lg font-medium">{title}</h3>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        {description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center">
          {salePrice ? (
            <>
              <span className="text-lg font-bold text-red-600">
                {formatPrice(salePrice)}
              </span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold">{formatPrice(price)}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="flex-1" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button variant="outline" onClick={handleQuickView}>
          Quick View
        </Button>
      </CardFooter>
    </Card>
  );
}
