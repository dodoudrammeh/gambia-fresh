import { X } from "lucide-react";
import type { Product } from "../types";
import { money } from "../utils";

export interface SavedPanelProps {
  products: Product[];
  onSave: (product: Product) => void;
  onAdd: (product: Product) => void;
}

export const SavedPanel = ({ products, onSave, onAdd }: SavedPanelProps) => {
  if (products.length === 0) {
    return (
      <p className="text-sm text-muted">
        Your wishlist is empty. Tap the heart on a product to keep it here.
      </p>
    );
  }

  return (
    <ul className="max-h-72 space-y-3 overflow-auto">
      {products.map((product) => (
        <li key={product.id} className="flex items-center gap-3">
          <img
            src={product.image}
            alt=""
            className="size-14 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{product.name}</p>
            <p className="text-sm text-brand">{money(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="cursor-pointer text-xs font-semibold text-brand"
          >
            Add
          </button>
          <button
            type="button"
            aria-label={`Remove ${product.name}`}
            onClick={() => onSave(product)}
            className="cursor-pointer text-muted"
          >
            <X className="size-4" />
          </button>
        </li>
      ))}
    </ul>
  );
};
