import { ChevronDown } from "lucide-react";
import { cx } from "../utils";

export interface FilterTabsProps {
  label: string;
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export const FilterTabs = ({
  label,
  tabs,
  active,
  onChange,
}: FilterTabsProps) => {
  return (
    <div
      role="toolbar"
      aria-label={label}
      className="flex gap-2 overflow-x-auto pb-1"
    >
      {tabs.map((tab) => {
        const on = tab === active;
        return (
          <button
            key={tab}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(tab)}
            className={cx(
              "inline-flex shrink-0 cursor-pointer items-center rounded-full px-3.5 py-1.5 text-sm font-semibold transition",
              on
                ? "bg-brand text-white"
                : "bg-white text-ink ring-1 ring-slate-200 hover:bg-brand-soft",
            )}
          >
            {tab}
            {tab === "More" && <ChevronDown className="ml-1 size-3.5 " />}
          </button>
        );
      })}
    </div>
  );
};
