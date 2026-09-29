import type { Product } from "../types";
import { cx } from "../utils";
import { ProductCard } from "./ProductCard";

export interface ProductGridProps {
  products: Product[];
  saved: string[];
  addedId: string | null;
  onAdd: (product: Product) => void;
  onSave: (product: Product) => void;
  empty: string;
  columns?: 4 | 5;
}

export const ProductGrid = ({
  products,
  saved,
  addedId,
  onAdd,
  onSave,
  empty,
  columns = 5,
}: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center text-sm text-muted">
        {empty}
      </p>
    );
  }

  return (
    <ul
      className={cx(
        "grid grid-cols-1 gap-3",
        columns === 5
          ? "sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          : "sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            saved={saved.includes(product.id)}
            added={addedId === product.id}
            onAdd={onAdd}
            onSave={onSave}
          />
        </li>
      ))}
    </ul>
  );
};
