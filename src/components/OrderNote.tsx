export interface OrderNoteProps {
  onOpenCart: () => void;
  receiptNumber?: string | null;
  onViewReceipt?: () => void;
}

export const OrderNote = ({
  onOpenCart,
  receiptNumber,
  onViewReceipt,
}: OrderNoteProps) => {
  return (
    <div className="space-y-3">
      {receiptNumber ? (
        <p className="text-sm text-muted">
          Your latest order is{" "}
          <span className="font-semibold text-ink">{receiptNumber}</span>. Open
          the paper slip if you want to read it again or print it.
        </p>
      ) : (
        <p className="text-sm text-muted">
          Orders are confirmed on WhatsApp, then paid on delivery. There is no
          order number to look up yet.
        </p>
      )}
      {receiptNumber && onViewReceipt && (
        <button
          type="button"
          onClick={onViewReceipt}
          className="w-full cursor-pointer rounded-xl bg-brand py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          View receipt
        </button>
      )}
      <button
        type="button"
        onClick={onOpenCart}
        className={`w-full cursor-pointer rounded-xl py-2 text-sm font-semibold ${
          receiptNumber
            ? "bg-brand-soft text-brand-deep"
            : "bg-brand text-white hover:bg-brand-dark"
        }`}
      >
        Open cart
      </button>
    </div>
  );
};
