export interface AccountCardProps {
  location: string;
}

export const AccountCard = ({ location }: AccountCardProps) => {
  return (
    <div className="space-y-2">
      <p className="font-semibold text-ink">Hello, guest</p>
      <p className="text-sm text-muted">
        You are shopping for delivery around {location}. Send your cart on
        WhatsApp and pay when the order arrives.
      </p>
    </div>
  );
};
