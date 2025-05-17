import React, { useState } from "react";
import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  salePrice?: number;
  currency?: string;
  imageSrc?: string;
  imageAlt?: string;
  badge?: string;
  category?: string;
  brand?: string;
  colors?: string[];
  sizes?: string[];
}

interface ProductListProps {
  products?: Product[];
  loading?: boolean;
  itemsPerPage?: number;
  totalItems?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (sortKey: string) => void;
  onViewChange?: (viewType: "grid" | "list") => void;
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const defaultProducts: Product[] = [
  {
    id: "prod-1",
    title: "Premium T-Shirt",
    description: "Comfortable cotton t-shirt with modern design.",
    price: 29.99,
    imageSrc: "/api/placeholder/300/300",
    category: "clothing",
    brand: "brand-1",
  },
  {
    id: "prod-2",
    title: "Designer Jeans",
    description: "Classic blue jeans for everyday wear.",
    price: 79.99,
    salePrice: 59.99,
    badge: "Sale",
    imageSrc: "/api/placeholder/300/300",
    category: "clothing",
    brand: "brand-2",
  },
  {
    id: "prod-3",
    title: "Wireless Headphones",
    description: "High-quality sound with noise cancellation.",
    price: 199.99,
    imageSrc: "/api/placeholder/300/300",
    category: "electronics",
    brand: "brand-3",
  },
  {
    id: "prod-4",
    title: "Running Shoes",
    description: "Lightweight shoes perfect for running and training.",
    price: 89.99,
    imageSrc: "/api/placeholder/300/300",
    category: "shoes",
    brand: "brand-1",
  },
  {
    id: "prod-5",
    title: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots.",
    price: 49.99,
    salePrice: 39.99,
    badge: "Sale",
    imageSrc: "/api/placeholder/300/300",
    category: "accessories",
    brand: "brand-4",
  },
  {
    id: "prod-6",
    title: "Smartwatch",
    description: "Track your fitness and stay connected with notifications.",
    price: 249.99,
    imageSrc: "/api/placeholder/300/300",
    category: "electronics",
    brand: "brand-3",
  },
];

export default function ProductList({
  products = defaultProducts,
  loading = false,
  itemsPerPage = 6,
  totalItems = 24,
  currentPage = 1,
  onPageChange,
  onSortChange,
  onViewChange,
  onAddToCart,
  onQuickView,
  className = "",
  style,
}: ProductListProps) {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState("featured");

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleViewChange = (type: "grid" | "list") => {
    setViewType(type);
    if (onViewChange) onViewChange(type);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    if (onSortChange) onSortChange(value);
  };

  const handlePageChange = (page: number) => {
    if (onPageChange) onPageChange(page);
  };

  const generatePagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={`product-list-container ${className}`} style={style}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-500">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}{" "}
            - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            products
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">View:</span>
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewType === "grid" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => handleViewChange("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewType === "list" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => handleViewChange("list")}
              >
                List
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="bestselling">Best Selling</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              key={index}
              className="border rounded-md p-4 h-80 animate-pulse bg-gray-100"
            ></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search terms
          </p>
          <Button onClick={() => window.location.reload()}>
            Reset All Filters
          </Button>
        </div>
      ) : (
        <div
          className={
            viewType === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {products.map((product) =>
            viewType === "grid" ? (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                salePrice={product.salePrice}
                imageSrc={product.imageSrc}
                imageAlt={product.imageAlt || product.title}
                badge={product.badge}
                onAddToCart={() => onAddToCart && onAddToCart(product.id)}
                onQuickView={() => onQuickView && onQuickView(product.id)}
              />
            ) : (
              <div
                key={product.id}
                className="flex border rounded-md overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="w-40 h-40 flex-shrink-0">
                  <img
                    src={product.imageSrc || "/api/placeholder/160/160"}
                    alt={product.imageAlt || product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow p-4 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{product.title}</h3>
                      {product.description && (
                        <p className="text-gray-500 mt-1">
                          {product.description}
                        </p>
                      )}
                    </div>
                    {product.badge && (
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <div>
                      {product.salePrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-red-600">
                            ${product.salePrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => onQuickView && onQuickView(product.id)}
                        variant="outline"
                      >
                        Quick View
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onAddToCart && onAddToCart(product.id)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {generatePagination().map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
