import { Leaf } from "lucide-react";
import { cx } from "../utils";

export interface LogoProps {
  light?: boolean;
}

export const Logo = ({ light = false }: LogoProps) => {
  return (
    <a href="#top" className="flex shrink-0 items-center gap-2.5">
      <span
        className={cx(
          "grid size-10 place-items-center rounded-full",
          light ? "bg-white/15 text-white" : "bg-brand-soft text-brand",
        )}
      >
        <Leaf className="size-5" />
      </span>
      <span className="leading-none">
        <span
          className={cx(
            "block text-lg font-extrabold tracking-tight whitespace-nowrap",
            light ? "text-white" : "text-ink",
          )}
        >
          Gambia Fresh
        </span>
        <span
          className={cx(
            "mt-1 block text-[11px] font-semibold",
            light ? "text-white/75" : "text-brand",
          )}
        >
          gambiafresh.com
        </span>
      </span>
    </a>
  );
};
