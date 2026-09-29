import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product, Tone } from "../types";
import { cx, money } from "../utils";

const badgeTone: Record<Tone, string> = {
  green: "bg-brand text-white",
  orange: "bg-deal text-white",
  red: "bg-sale text-white",
};

export interface ProductCardProps {
  product: Product;
  saved: boolean;
  added: boolean;
  onAdd: (product: Product) => void;
  onSave: (product: Product) => void;
}

export const ProductCard = ({
  product,
  saved,
  added,
  onAdd,
  onSave,
}: ProductCardProps) => {
  return (
    <article className="group flex h-full flex-col rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-brand-soft">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={cx(
              "absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[11px] font-bold",
              badgeTone[product.tone ?? "green"],
            )}
          >
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label={
            saved
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          aria-pressed={saved}
          onClick={() => onSave(product)}
          className="absolute top-2.5 right-2.5 grid size-8 cursor-pointer place-items-center rounded-full bg-white/95 text-ink shadow-sm transition hover:text-sale"
        >
          <Heart className={cx("size-4", saved && "fill-sale text-sale")} />
        </button>
      </div>
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="font-semibold text-ink">{product.name}</h3>
        <p className="text-sm text-muted">{product.weight}</p>
        {product.reviews > 0 && (
          <p className="mt-1 flex items-center gap-1 text-sm text-muted">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-ink">
              {product.rating.toFixed(1)}
            </span>
            <span>({product.reviews})</span>
          </p>
        )}
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-ink">
            {money(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-slate-400 line-through">
              {money(product.oldPrice)}
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={() => onAdd(product)}
          className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          <ShoppingCart className="size-4" />
          {added ? "Added" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
};
