export interface ShopSettings {
  name: string;
  whatsapp: string;
  phoneDisplay: string;
  email: string;
  location: string;
  deliveryFee: number;
  areas: readonly string[];
  deliveryTimes: readonly string[];
}

export const shop: ShopSettings = {
  name: "Gambia Fresh",
  whatsapp: "220872449020",
  phoneDisplay: "+220 872 449 020",
  email: "drammehdodoutech@gmail.com",
  location: "Busumbala, The Gambia",
  deliveryFee: 50,
  areas: [
    "Busumbala",
    "Lamin",
    "Yundum",
    "Brikama",
    "Banjul",
  ],
  deliveryTimes: ["Today morning", "Today evening", "Tomorrow"],
};
