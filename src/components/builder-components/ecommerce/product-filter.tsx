import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface ProductFilterProps {
  className?: string;
  style?: React.CSSProperties;
  onFilterChange?: (filters: ProductFilterValues) => void;
  defaultValues?: Partial<ProductFilterValues>;
  categories?: string[];
  showPriceFilter?: boolean;
  showCategoryFilter?: boolean;
  showRatingFilter?: boolean;
  showAvailabilityFilter?: boolean;
  showSortOptions?: boolean;
  minPrice?: number;
  maxPrice?: number;
  compactMode?: boolean;
  clearFiltersLabel?: string;
  applyFiltersLabel?: string;
  priceRangeLabel?: string;
  categoriesLabel?: string;
  ratingLabel?: string;
  availabilityLabel?: string;
  sortByLabel?: string;
  inStockLabel?: string;
  title?: string;
}

export interface ProductFilterValues {
  priceRange: [number, number];
  categories: string[];
  rating: number | null;
  inStock: boolean;
  sortBy:
    | "price-asc"
    | "price-desc"
    | "newest"
    | "rating"
    | "popularity"
    | null;
}

const defaultCategories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books",
  "Beauty",
  "Toys",
  "Sports & Outdoors",
];

const ProductFilter = ({
  className,
  style,
  onFilterChange,
  defaultValues,
  categories = defaultCategories,
  showPriceFilter = true,
  showCategoryFilter = true,
  showRatingFilter = true,
  showAvailabilityFilter = true,
  showSortOptions = true,
  minPrice = 0,
  maxPrice = 1000,
  compactMode = false,
  clearFiltersLabel = "Clear Filters",
  applyFiltersLabel = "Apply Filters",
  priceRangeLabel = "Price Range",
  categoriesLabel = "Categories",
  ratingLabel = "Rating",
  availabilityLabel = "Availability",
  sortByLabel = "Sort By",
  inStockLabel = "In Stock Only",
  title = "Filter Products",
}: ProductFilterProps) => {
  const [filters, setFilters] = useState<ProductFilterValues>({
    priceRange: defaultValues?.priceRange || [minPrice, maxPrice],
    categories: defaultValues?.categories || [],
    rating: defaultValues?.rating || null,
    inStock: defaultValues?.inStock || false,
    sortBy: defaultValues?.sortBy || null,
  });

  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newCategories = [...filters.categories];
    if (checked) {
      newCategories.push(category);
    } else {
      newCategories = newCategories.filter((c) => c !== category);
    }
    setFilters({
      ...filters,
      categories: newCategories,
    });
  };

  const handleRatingChange = (value: string) => {
    setFilters({
      ...filters,
      rating: parseInt(value, 10),
    });
  };

  const handleInStockChange = (checked: boolean) => {
    setFilters({
      ...filters,
      inStock: checked,
    });
  };

  const handleSortByChange = (value: string) => {
    setFilters({
      ...filters,
      sortBy: value as ProductFilterValues["sortBy"],
    });
  };

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  const handleClearFilters = () => {
    const resetFilters: ProductFilterValues = {
      priceRange: [minPrice, maxPrice],
      categories: [],
      rating: null,
      inStock: false,
      sortBy: null,
    };
    setFilters(resetFilters);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  const FilterContainer = compactMode ? Accordion : React.Fragment;
  const filterContainerProps = compactMode
    ? {
        type: "single",
        collapsible: true,
        className: "w-full",
      }
    : {};

  return (
    <div
      className={cn("w-full bg-background p-4 rounded-md border", className)}
      style={style}
    >
      {title && <h3 className="font-medium text-lg mb-4">{title}</h3>}

      <FilterContainer {...filterContainerProps}>
        {showPriceFilter &&
          (compactMode ? (
            <AccordionItem value="price-range">
              <AccordionTrigger className="text-sm font-medium">
                {priceRangeLabel}
              </AccordionTrigger>
              <AccordionContent>
                <PriceRangeFilter
                  value={filters.priceRange}
                  min={minPrice}
                  max={maxPrice}
                  onChange={handlePriceChange}
                  formatPrice={formatPrice}
                />
              </AccordionContent>
            </AccordionItem>
          ) : (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">{priceRangeLabel}</h4>
              <PriceRangeFilter
                value={filters.priceRange}
                min={minPrice}
                max={maxPrice}
                onChange={handlePriceChange}
                formatPrice={formatPrice}
              />
            </div>
          ))}

        {showCategoryFilter &&
          categories.length > 0 &&
          (compactMode ? (
            <AccordionItem value="categories">
              <AccordionTrigger className="text-sm font-medium">
                {categoriesLabel}
              </AccordionTrigger>
              <AccordionContent>
                <CategoryFilter
                  categories={categories}
                  selectedCategories={filters.categories}
                  onChange={handleCategoryChange}
                />
              </AccordionContent>
            </AccordionItem>
          ) : (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">{categoriesLabel}</h4>
              <CategoryFilter
                categories={categories}
                selectedCategories={filters.categories}
                onChange={handleCategoryChange}
              />
            </div>
          ))}

        {showRatingFilter &&
          (compactMode ? (
            <AccordionItem value="rating">
              <AccordionTrigger className="text-sm font-medium">
                {ratingLabel}
              </AccordionTrigger>
              <AccordionContent>
                <RatingFilter
                  value={filters.rating}
                  onChange={handleRatingChange}
                />
              </AccordionContent>
            </AccordionItem>
          ) : (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">{ratingLabel}</h4>
              <RatingFilter
                value={filters.rating}
                onChange={handleRatingChange}
              />
            </div>
          ))}

        {showAvailabilityFilter &&
          (compactMode ? (
            <AccordionItem value="availability">
              <AccordionTrigger className="text-sm font-medium">
                {availabilityLabel}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={filters.inStock}
                    onCheckedChange={handleInStockChange}
                  />
                  <Label htmlFor="in-stock">{inStockLabel}</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          ) : (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">{availabilityLabel}</h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={filters.inStock}
                  onCheckedChange={handleInStockChange}
                />
                <Label htmlFor="in-stock">{inStockLabel}</Label>
              </div>
            </div>
          ))}

        {showSortOptions &&
          (compactMode ? (
            <AccordionItem value="sort-by">
              <AccordionTrigger className="text-sm font-medium">
                {sortByLabel}
              </AccordionTrigger>
              <AccordionContent>
                <SortByFilter
                  value={filters.sortBy}
                  onChange={handleSortByChange}
                />
              </AccordionContent>
            </AccordionItem>
          ) : (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">{sortByLabel}</h4>
              <SortByFilter
                value={filters.sortBy}
                onChange={handleSortByChange}
              />
            </div>
          ))}
      </FilterContainer>

      <div
        className={cn("flex gap-2 mt-4", compactMode ? "flex-col" : "flex-row")}
      >
        <Button
          onClick={handleClearFilters}
          variant="outline"
          className={cn("text-sm", compactMode ? "w-full" : "")}
        >
          {clearFiltersLabel}
        </Button>
        <Button
          onClick={handleApplyFilters}
          className={cn("text-sm", compactMode ? "w-full" : "")}
        >
          {applyFiltersLabel}
        </Button>
      </div>
    </div>
  );
};

// Sub-components for readability
const PriceRangeFilter = ({
  value,
  min,
  max,
  onChange,
  formatPrice,
}: {
  value: [number, number];
  min: number;
  max: number;
  onChange: (value: number[]) => void;
  formatPrice: (price: number) => string;
}) => {
  return (
    <div className="space-y-4">
      <Slider
        defaultValue={value}
        min={min}
        max={max}
        step={1}
        onValueChange={onChange}
      />
      <div className="flex justify-between text-sm">
        <span>{formatPrice(value[0])}</span>
        <span>{formatPrice(value[1])}</span>
      </div>
    </div>
  );
};

const CategoryFilter = ({
  categories,
  selectedCategories,
  onChange,
}: {
  categories: string[];
  selectedCategories: string[];
  onChange: (category: string, checked: boolean) => void;
}) => {
  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {categories.map((category) => (
        <div key={category} className="flex items-center space-x-2">
          <Checkbox
            id={`category-${category}`}
            checked={selectedCategories.includes(category)}
            onCheckedChange={(checked) => onChange(category, checked === true)}
          />
          <Label htmlFor={`category-${category}`}>{category}</Label>
        </div>
      ))}
    </div>
  );
};

const RatingFilter = ({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (value: string) => void;
}) => {
  return (
    <RadioGroup value={value?.toString() || ""} onValueChange={onChange}>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div key={rating} className="flex items-center space-x-2">
          <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
          <Label htmlFor={`rating-${rating}`} className="flex items-center">
            {[...Array(rating)].map((_, i) => (
              <StarIcon
                key={i}
                className="w-4 h-4 fill-current text-yellow-400"
              />
            ))}
            {[...Array(5 - rating)].map((_, i) => (
              <StarIcon
                key={i + rating}
                className="w-4 h-4 fill-current text-gray-300"
              />
            ))}
            <span className="ml-1">& Up</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

const SortByFilter = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (value: string) => void;
}) => {
  const sortOptions = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest Arrivals" },
    { value: "rating", label: "Highest Rated" },
    { value: "popularity", label: "Popularity" },
  ];

  return (
    <RadioGroup value={value || ""} onValueChange={onChange}>
      {sortOptions.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
          <Label htmlFor={`sort-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

// Simple star icon component
const StarIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={className}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
};

export default ProductFilter;
