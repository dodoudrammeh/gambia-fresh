import type { FormEvent } from "react";
import type { CartLine } from "../types";
import { money } from "../utils";

export interface CartPanelProps {
  lines: CartLine[];
  deliveryFee: number;
  customerName: string;
  customerPhone: string;
  area: string;
  landmark: string;
  deliveryTime: string;
  deliveryTimes: readonly string[];
  updating: boolean;
  onQty: (id: string, delta: number) => void;
  onCustomerNameChange: (name: string) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onAreaChange: (area: string) => void;
  onLandmarkChange: (landmark: string) => void;
  onDeliveryTimeChange: (deliveryTime: string) => void;
  onOrder: (event: FormEvent) => void;
}

export const CartPanel = ({
  lines,
  deliveryFee,
  customerName,
  customerPhone,
  area,
  landmark,
  deliveryTime,
  deliveryTimes,
  updating,
  onQty,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onAreaChange,
  onLandmarkChange,
  onDeliveryTimeChange,
  onOrder,
}: CartPanelProps) => {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  const total = subtotal + deliveryFee;

  if (lines.length === 0) {
    return (
      <p className="text-sm text-muted">
        Your cart is empty. please Add fresh produce and it will show up here.
      </p>
    );
  }

  return (
    <form onSubmit={onOrder} className="space-y-2">
      <ul className="space-y-2">
        {lines.map((line) => (
          <li key={line.id} className="flex items-center gap-3">
            <img
              src={line.image}
              alt=""
              className="size-10 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">
                {line.name}
              </p>
              <p className="text-sm text-brand">{money(line.price)}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={`Decrease ${line.name}`}
                onClick={() => onQty(line.id, -1)}
                className="grid size-7 cursor-pointer place-items-center rounded-md bg-slate-100"
              >
                −
              </button>
              <span className="w-5 text-center text-sm font-semibold">
                {line.qty}
              </span>
              <button
                type="button"
                aria-label={`Increase ${line.name}`}
                onClick={() => onQty(line.id, 1)}
                className="grid size-7 cursor-pointer place-items-center rounded-md bg-slate-100"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 border-t border-slate-100 pt-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-semibold text-ink">{money(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Delivery</span>
          <span className="font-semibold text-ink">{money(deliveryFee)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Total</span>
          <span className="font-extrabold text-ink">{money(total)}</span>
        </div>
      </div>
      <label className="block text-sm">
        <span className="font-semibold text-ink">Your name</span>
        <input
          required
          value={customerName}
          onChange={(event) => onCustomerNameChange(event.target.value)}
          autoComplete="name"
          className="mt-0.5 w-full rounded-xl border border-slate-200 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand/30"
        />
      </label>
      <label className="block text-sm">
        <span className="font-semibold text-ink">Phone</span>
        <input
          required
          type="tel"
          value={customerPhone}
          onChange={(event) => onCustomerPhoneChange(event.target.value)}
          autoComplete="tel"
          placeholder="+220 ..."
          className="mt-0.5 w-full rounded-xl border border-slate-200 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand/30"
        />
      </label>
      <label className="block text-sm">
        <span className="font-semibold text-ink">Delivery area</span>
        <input
          required
          value={area}
          onChange={(event) => onAreaChange(event.target.value)}
          autoComplete="address-level2"
          placeholder="Type your area, village, or neighbourhood"
          className="mt-0.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand/30"
        />
      </label>
      <label className="block text-sm">
        <span className="font-semibold text-ink">Where is the house?</span>
        <input
          required
          value={landmark}
          onChange={(event) => onLandmarkChange(event.target.value)}
          placeholder="Near the mosque, or the blue gate"
          className="mt-0.5 w-full rounded-xl border border-slate-200 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand/30"
        />
      </label>
      <label className="block text-sm">
        <span className="font-semibold text-ink">When do you want it?</span>
        <select
          required
          value={deliveryTime}
          onChange={(event) => onDeliveryTimeChange(event.target.value)}
          className="mt-0.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand/30"
        >
          {deliveryTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>
      <p className="text-sm text-muted">
        We confirm this order on WhatsApp. You pay when it arrives.
        {updating
          ? " You can still change this order."
          : " You can change it for 5 minutes after you send it."}
      </p>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-xl bg-brand py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        {updating ? "Update order on WhatsApp" : "Order on WhatsApp"}
      </button>
    </form>
  );
};
