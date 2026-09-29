import type { FormEvent } from "react";
import { Search } from "lucide-react";

export interface SearchFieldProps {
  id: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}

export const SearchField = ({
  id,
  value,
  placeholder,
  onChange,
  onSubmit,
}: SearchFieldProps) => {
  return (
    <form onSubmit={onSubmit} role="search">
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <div className="flex items-center rounded-full border border-slate-200 bg-[#f7f8f6] p-1">
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-ink outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          aria-label="Search"
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-brand text-white transition hover:bg-brand-dark"
        >
          <Search className="size-4" />
        </button>
      </div>
    </form>
  );
};
