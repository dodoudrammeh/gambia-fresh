import type { Receipt } from "../types";
import { money } from "../utils";

export interface OrderSlipProps {
  receipt: Receipt;
  secondsLeft: number;
  onClose: () => void;
  onPrint: () => void;
  onChange: () => void;
}

export const OrderSlip = ({
  receipt,
  secondsLeft,
  onClose,
  onPrint,
  onChange,
}: OrderSlipProps) => {
  const placed = new Date(receipt.placedAt).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center overflow-auto bg-black/50 p-4">
      <article
        id="order-slip"
        aria-labelledby="order-slip-title"
        className="my-4 w-full max-w-md bg-white px-6 py-8 text-ink shadow-2xl"
      >
        <header className="border-b border-dashed border-slate-300 pb-4 text-center">
          <p className="text-xl font-extrabold">{receipt.shopName}</p>
          <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-muted">
            ORDER SLIP
          </p>
          <h2 id="order-slip-title" className="mt-3 text-lg font-bold">
            {receipt.number}
          </h2>
          <p className="text-sm text-muted">{placed}</p>
        </header>
        <dl className="mt-4 space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Name</dt>
            <dd className="text-right font-semibold">{receipt.customerName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Phone</dt>
            <dd className="text-right font-semibold">
              {receipt.customerPhone}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Area</dt>
            <dd className="text-right font-semibold">{receipt.area}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Landmark</dt>
            <dd className="text-right font-semibold">{receipt.landmark}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">When</dt>
            <dd className="text-right font-semibold">{receipt.deliveryTime}</dd>
          </div>
        </dl>
        <ul className="mt-4 space-y-2 border-t border-dashed border-slate-300 pt-4 text-sm">
          {receipt.lines.map((line) => (
            <li key={line.id} className="flex justify-between gap-3">
              <span>
                {line.qty} x {line.name}
              </span>
              <span className="shrink-0 font-semibold">
                {money(line.total)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-dashed border-slate-300 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span className="font-semibold">{money(receipt.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Delivery</span>
            <span className="font-semibold">{money(receipt.deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-base">
            <span className="font-bold">Total</span>
            <span className="font-extrabold">{money(receipt.total)}</span>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-muted">
          Confirmed on WhatsApp. Pay on delivery.
        </p>
        <p className="mt-2 text-center text-sm font-semibold text-ink">
          {secondsLeft > 0
            ? `You can change this order for ${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}.`
            : "This order is set. Message us on WhatsApp if you still need a change."}
        </p>
        <div className="no-print mt-5 flex flex-col gap-2">
          {secondsLeft > 0 && (
            <button
              type="button"
              onClick={onChange}
              className="w-full cursor-pointer rounded-xl bg-ink py-2.5 text-sm font-semibold text-white"
            >
              Change order
            </button>
          )}
          <button
            type="button"
            onClick={onPrint}
            className="w-full cursor-pointer rounded-xl bg-brand py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Print
          </button>
          <a
            href={receipt.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl bg-brand-soft py-2.5 text-center text-sm font-semibold text-brand-deep"
          >
            Open WhatsApp
          </a>
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-xl py-2 text-sm font-semibold text-muted hover:text-ink"
          >
            Close
          </button>
        </div>
      </article>
    </div>
  );
};
