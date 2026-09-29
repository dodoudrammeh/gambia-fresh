export const photo = (id: string, width = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const money = (value: number) =>
  new Intl.NumberFormat("en-GM", {
    style: "currency",
    currency: "GMD",
    maximumFractionDigits: 0,
  }).format(value);

export const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");
