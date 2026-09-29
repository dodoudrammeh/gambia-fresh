import type { ReactNode } from "react";
import { X } from "lucide-react";

export interface MenuCardProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  drop?: boolean;
}

export const MenuCard = ({ title, children, onClose, drop }: MenuCardProps) => {
  return (
    <div
      className={`absolute right-0 z-50 w-[min(22rem,calc(100vw-1.5rem))] rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200 ${
        drop ? "top-full mt-3" : "mt-3"
      }`}
    >
      <p className="sr-only">{title}</p>
      {onClose && (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 grid size-7 cursor-pointer place-items-center rounded-full text-ink hover:bg-slate-100"
        >
          <X className="size-4" />
        </button>
      )}
      <div className={onClose ? "pr-8" : undefined}>{children}</div>
    </div>
  );
};
