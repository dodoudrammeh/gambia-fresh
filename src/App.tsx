import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  User,
  X,
} from "lucide-react";
import { AccountCard } from "./components/AccountCard";
import { CartPanel } from "./components/CartPanel";
import { DealsTimer } from "./components/DealsTimer";
import { FilterTabs } from "./components/FilterTabs";
import { Logo } from "./components/Logo";
import { MenuCard } from "./components/MenuCard";
import { ProductCard } from "./components/ProductCard";
import { ProductGrid } from "./components/ProductGrid";
import { OrderNote } from "./components/OrderNote";
import { OrderSlip } from "./components/OrderSlip";
import { SavedPanel } from "./components/SavedPanel";
import { SearchField } from "./components/SearchField";
import { shop } from "./shop";
import type { CartLine, Legal, Panel, Product, Receipt } from "./types";
import { money, photo } from "./utils";

const popularTabs = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Snacks",
  "Beverages",
  "More",
];

const bestTabs = ["Fruits", "Vegetables", "Dairy", "Bakery", "Snacks"];

const categories = [
  {
    name: "Fruits & Vegetables",
    tab: "Fruits",
    image: photo("photo-1619566636858-adf3ef46400b", 400),
  },
  {
    name: "Dairy & Eggs",
    tab: "Dairy",
    image: photo("photo-1550583724-b2692b85b150", 400),
  },
  {
    name: "Bakery & Bread",
    tab: "Bakery",
    image: photo("photo-1509440159596-0249088772ff", 400),
  },
  {
    name: "Meat & Seafood",
    tab: "More",
    image: photo("photo-1519708227418-c8fd9a32b7a2", 400),
  },
  {
    name: "Pantry Staples",
    tab: "All",
    image: photo("photo-1586201375761-83865001e31c", 400),
  },
  {
    name: "Snacks & Beverages",
    tab: "Snacks",
    image: photo("photo-1600271886742-f049cd451bba", 400),
  },
  {
    name: "Household",
    tab: "All",
    image: photo("photo-1563453392212-326f5e854473", 400),
  },
  {
    name: "Personal Care",
    tab: "All",
    image: photo("photo-1556228720-195a672e8a03", 400),
  },
];

const needs = [
  {
    title: "Quick Meals",
    text: "Ready in Minutes",
    image: photo("photo-1546069901-ba9599a7e63c", 400),
  },
  {
    title: "Healthy Living",
    text: "Eat Better",
    image: photo("photo-1512621776951-a57141f2eefd", 400),
  },
  {
    title: "Budget Friendly",
    text: "Save More",
    image: photo("photo-1542838132-92c53300491e", 400),
  },
  {
    title: "Family Packs",
    text: "For Everyone",
    image: photo("photo-1606787366850-de6330128bfc", 400),
  },
];

const popularProducts: Product[] = [
  {
    id: "p-bananas",
    name: "Fresh Bananas",
    weight: "1 kg",
    price: 140,
    oldPrice: 175,
    rating: 4.5,
    reviews: 128,
    image: photo("photo-1571771894821-ce9b6c11b08e", 600),
    badge: "Fresh",
    tone: "green",
    category: "Fruits",
  },
  {
    id: "p-spinach",
    name: "Organic Spinach",
    weight: "250 g",
    price: 175,
    oldPrice: 225,
    rating: 4.7,
    reviews: 98,
    image: photo("photo-1576045057995-568f588f82fb", 600),
    badge: "Organic",
    tone: "green",
    category: "Vegetables",
  },
  {
    id: "p-apples",
    name: "Red Apples",
    weight: "1 kg",
    price: 245,
    oldPrice: 295,
    rating: 4.8,
    reviews: 210,
    image: photo("photo-1560806887-1e4cd0b6cbd6", 600),
    badge: "Best Seller",
    tone: "orange",
    category: "Fruits",
  },
  {
    id: "p-milk",
    name: "Fresh Milk",
    weight: "1 L",
    price: 140,
    oldPrice: 175,
    rating: 4.6,
    reviews: 156,
    image: photo("photo-1563636619-e9143da7973b", 600),
    category: "Dairy",
  },
  {
    id: "p-bread",
    name: "Brown Bread",
    weight: "400 g",
    price: 155,
    oldPrice: 190,
    rating: 4.4,
    reviews: 87,
    image: photo("photo-1549931319-a545dcf3bc73", 600),
    category: "Bakery",
  },
  {
    id: "p-chicken",
    name: "Chicken Breast",
    weight: "1 kg",
    price: 350,
    oldPrice: 455,
    rating: 4.6,
    reviews: 142,
    image: photo("photo-1604503468506-a8da13d82791", 600),
    badge: "Fresh",
    tone: "green",
    category: "More",
  },
  {
    id: "p-yogurt",
    name: "Greek Yogurt",
    weight: "500 g",
    price: 210,
    oldPrice: 245,
    rating: 4.5,
    reviews: 76,
    image: photo("photo-1488477181946-6428a0291777", 600),
    category: "Dairy",
  },
  {
    id: "p-nuts",
    name: "Mixed Nuts",
    weight: "200 g",
    price: 385,
    oldPrice: 490,
    rating: 4.7,
    reviews: 64,
    image: photo("photo-1599599810769-bcde5a160d32", 600),
    category: "Snacks",
  },
  {
    id: "p-mangoes",
    name: "Ripe Mangoes",
    weight: "1 kg",
    price: 210,
    oldPrice: 295,
    rating: 4.8,
    reviews: 188,
    image: photo("photo-1553279768-865429fa0078", 600),
    badge: "Sale",
    tone: "red",
    category: "Fruits",
  },
  {
    id: "p-eggs",
    name: "Organic Eggs",
    weight: "12 pcs",
    price: 245,
    oldPrice: 300,
    rating: 4.6,
    reviews: 203,
    image: photo("photo-1582722872445-44dc5f7e3c8f", 600),
    badge: "Organic",
    tone: "green",
    category: "Dairy",
  },
  {
    id: "p-juice",
    name: "Orange Juice",
    weight: "1 L",
    price: 230,
    oldPrice: 280,
    rating: 4.4,
    reviews: 91,
    image: photo("photo-1600271886742-f049cd451bba", 600),
    badge: "Fresh",
    tone: "green",
    category: "Beverages",
    showInAll: false,
  },
  {
    id: "p-smoothie",
    name: "Berry Smoothie",
    weight: "750 ml",
    price: 315,
    oldPrice: 370,
    rating: 4.6,
    reviews: 54,
    image: photo("photo-1505252585461-04db1eb84625", 600),
    category: "Beverages",
    showInAll: false,
  },
];

const dealProducts: Product[] = [
  {
    id: "d-tomatoes",
    name: "Fresh Tomatoes",
    weight: "1 kg",
    price: 90,
    oldPrice: 140,
    rating: 0,
    reviews: 0,
    image: photo("photo-1592924357228-91a4daadcfea", 600),
    badge: "20% OFF",
    tone: "orange",
    category: "Vegetables",
  },
  {
    id: "d-avocado",
    name: "Avocado",
    weight: "4 pcs",
    price: 210,
    oldPrice: 315,
    rating: 0,
    reviews: 0,
    image: photo("photo-1523049673857-eb18f1d7b578", 600),
    badge: "15% OFF",
    tone: "orange",
    category: "Fruits",
  },
  {
    id: "d-cheese",
    name: "Cheese Slice",
    weight: "200 g",
    price: 175,
    oldPrice: 210,
    rating: 0,
    reviews: 0,
    image: photo("photo-1486297678162-eb2a19b0a32d", 600),
    badge: "10% OFF",
    tone: "orange",
    category: "Dairy",
  },
  {
    id: "d-salmon",
    name: "Fresh Salmon",
    weight: "300 g",
    price: 560,
    oldPrice: 735,
    rating: 0,
    reviews: 0,
    image: photo("photo-1467003909585-2f8a72700288", 600),
    badge: "25% OFF",
    tone: "orange",
    category: "More",
  },
];

const bestProducts: Product[] = [
  {
    id: "b-orange",
    name: "Orange",
    weight: "1 kg",
    price: 140,
    oldPrice: 155,
    rating: 4.5,
    reviews: 120,
    image: photo("photo-1547514701-42782101795e", 600),
    badge: "10% OFF",
    tone: "orange",
    category: "Fruits",
  },
  {
    id: "b-grapes",
    name: "Grapes",
    weight: "500 g",
    price: 245,
    rating: 4.7,
    reviews: 86,
    image: photo("photo-1537640538966-79f369143f8f", 600),
    badge: "Organic",
    tone: "green",
    category: "Fruits",
  },
  {
    id: "b-strawberry",
    name: "Strawberry",
    weight: "250 g",
    price: 280,
    rating: 4.8,
    reviews: 164,
    image: photo("photo-1464965911861-746a04b4bca6", 600),
    category: "Fruits",
  },
  {
    id: "b-pineapple",
    name: "Pineapple",
    weight: "1 pc",
    price: 175,
    rating: 4.6,
    reviews: 73,
    image: photo("photo-1550258987-190a2d41a8ba", 600),
    category: "Fruits",
  },
  {
    id: "b-broccoli",
    name: "Broccoli",
    weight: "500 g",
    price: 160,
    rating: 4.5,
    reviews: 61,
    image: photo("photo-1459411621453-7b03977f4bfc", 600),
    badge: "Fresh",
    tone: "green",
    category: "Vegetables",
  },
  {
    id: "b-carrots",
    name: "Carrots",
    weight: "1 kg",
    price: 105,
    rating: 4.6,
    reviews: 94,
    image: photo("photo-1598170845058-32b9d6a5da37", 600),
    category: "Vegetables",
  },
  {
    id: "b-peppers",
    name: "Bell Peppers",
    weight: "500 g",
    price: 195,
    rating: 4.4,
    reviews: 48,
    image: photo("photo-1563565375-f3fdfdbefa83", 600),
    badge: "Sale",
    tone: "red",
    category: "Vegetables",
  },
  {
    id: "b-cucumber",
    name: "Cucumber",
    weight: "2 pcs",
    price: 85,
    rating: 4.3,
    reviews: 39,
    image: photo("photo-1449300079323-02e209d9d3a6", 600),
    category: "Vegetables",
  },
  {
    id: "b-milk",
    name: "Farm Milk",
    weight: "1 L",
    price: 130,
    rating: 4.7,
    reviews: 132,
    image: photo("photo-1550583724-b2692b85b150", 600),
    category: "Dairy",
  },
  {
    id: "b-butter",
    name: "Salted Butter",
    weight: "200 g",
    price: 225,
    rating: 4.6,
    reviews: 77,
    image: photo("photo-1589985270826-4b7bb135bc9d", 600),
    badge: "Fresh",
    tone: "green",
    category: "Dairy",
  },
  {
    id: "b-cheese",
    name: "Cheddar Block",
    weight: "250 g",
    price: 300,
    rating: 4.8,
    reviews: 101,
    image: photo("photo-1618164436241-4473940d1f5c", 600),
    category: "Dairy",
  },
  {
    id: "b-eggs",
    name: "Farm Eggs",
    weight: "12 pcs",
    price: 235,
    rating: 4.5,
    reviews: 88,
    image: photo("photo-1506976785307-8732e854ad03", 600),
    badge: "Organic",
    tone: "green",
    category: "Dairy",
  },
  {
    id: "b-croissant",
    name: "Butter Croissant",
    weight: "2 pcs",
    price: 175,
    rating: 4.7,
    reviews: 69,
    image: photo("photo-1555507036-ab1f4038808a", 600),
    badge: "Fresh",
    tone: "green",
    category: "Bakery",
  },
  {
    id: "b-baguette",
    name: "Sourdough Loaf",
    weight: "500 g",
    price: 230,
    rating: 4.8,
    reviews: 112,
    image: photo("photo-1509440159596-0249088772ff", 600),
    category: "Bakery",
  },
  {
    id: "b-cookies",
    name: "Oat Cookies",
    weight: "180 g",
    price: 155,
    rating: 4.4,
    reviews: 41,
    image: photo("photo-1499636136210-6f4ee915583e", 600),
    category: "Bakery",
  },
  {
    id: "b-bagel",
    name: "Sesame Bagels",
    weight: "4 pcs",
    price: 215,
    rating: 4.5,
    reviews: 36,
    image: photo("photo-1558961363-fa8fdf82db35", 600),
    category: "Bakery",
  },
  {
    id: "b-chips",
    name: "Sea Salt Chips",
    weight: "150 g",
    price: 125,
    rating: 4.3,
    reviews: 58,
    image: photo("photo-1566478989037-eec170784d0b", 600),
    category: "Snacks",
  },
  {
    id: "b-granola",
    name: "Honey Granola",
    weight: "350 g",
    price: 295,
    rating: 4.6,
    reviews: 47,
    image: photo("photo-1517686469429-8bdb88b9f907", 600),
    badge: "Organic",
    tone: "green",
    category: "Snacks",
  },
  {
    id: "b-almonds",
    name: "Roasted Almonds",
    weight: "200 g",
    price: 370,
    rating: 4.8,
    reviews: 83,
    image: photo("photo-1508061253366-f7da158b6d46", 600),
    category: "Snacks",
  },
  {
    id: "b-popcorn",
    name: "Butter Popcorn",
    weight: "100 g",
    price: 105,
    rating: 4.2,
    reviews: 29,
    image: photo("photo-1578849278619-e73505e9610f", 600),
    category: "Snacks",
  },
];

const catalog = [...popularProducts, ...dealProducts, ...bestProducts];

const shopLinks = [
  { label: "Popular products", href: "#popular" },
  { label: "Deals of the day", href: "#deals" },
  { label: "Best sellers", href: "#bestsellers" },
  { label: "Shop by needs", href: "#needs" },
];

const quickLinks = [
  { label: "Home", href: "#top" },
  { label: "Shop", href: "#popular" },
  { label: "Deals", href: "#deals" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const footerCategories = [
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Bakery & Bread",
  "Snacks & Beverages",
  "Household",
  "Personal Care",
];

const legalCopy: Record<Exclude<Legal, null>, string> = {
  privacy:
    "We use your name, phone, and delivery area only to pack and deliver the order you send on WhatsApp. Gambia Fresh does not sell personal information to advertisers.",
  terms:
    "An order is confirmed when we reply on WhatsApp. You pay on delivery. Perishable items can be returned the same day if they arrive damaged, warm, or short.",
  help: `Order on WhatsApp at ${shop.phoneDisplay} or email ${shop.email}. We deliver in ${shop.areas.join(", ")} from 8:00 AM to 9:00 PM, seven days a week.`,
};

const inQuery = (product: Product, query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return `${product.name} ${product.category} ${product.weight}`
    .toLowerCase()
    .includes(q);
};

const inPopularTab = (product: Product, tab: string) => {
  if (tab === "All") return product.showInAll !== false;
  return product.category === tab;
};

const socials = [
  {
    label: "Facebook",
    path: "M15 8h-2a1 1 0 0 0-1 1v2h3l-.4 3H12v8H9v-8H7v-3h2V8.6C9 6.6 10.3 5 12.5 5H15v3z",
  },
  {
    label: "Instagram",
    path: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm8 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm-4 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm4.7-2.4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z",
  },
  {
    label: "X",
    path: "M4 4h3.4l4.2 5.7L16.4 4H20l-6.2 7.5L20.3 20h-3.4l-4.6-6.2L7.4 20H4l6.6-8L4 4z",
  },
];

export const App = () => {
  const headerRef = useRef<HTMLElement>(null);
  const toastTimer = useRef<number | null>(null);
  const addedTimer = useRef<number | null>(null);
  const [panel, setPanel] = useState<Panel>(null);
  const [query, setQuery] = useState("");
  const [popularTab, setPopularTab] = useState("All");
  const [bestTab, setBestTab] = useState("Fruits");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<string>(shop.areas[0]);
  const [landmark, setLandmark] = useState("");
  const [deliveryTime, setDeliveryTime] = useState<string>(
    shop.deliveryTimes[0],
  );
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [slipOpen, setSlipOpen] = useState(false);
  const [legal, setLegal] = useState<Legal>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(12 * 3600 + 36 * 60 + 24);

  useEffect(() => {
    const id = window.setInterval(
      () => setSecondsLeft((value) => (value > 0 ? value - 1 : 0)),
      1000,
    );
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!receipt) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [receipt]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPanel(null);
        setSlipOpen(false);
      }
    };
    const onPointer = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setPanel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      if (addedTimer.current) window.clearTimeout(addedTimer.current);
    };
  }, []);

  const notify = (message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1800);
  };

  const toggle = (name: Exclude<Panel, null>) =>
    setPanel((current) => (current === name ? null : name));

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    setPanel(null);
    document.getElementById("popular")?.scrollIntoView({ block: "start" });
  };

  const addToCart = (product: Product) => {
    setCart((lines) => {
      const found = lines.find((line) => line.id === product.id);
      if (found) {
        return lines.map((line) =>
          line.id === product.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [
        ...lines,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ];
    });
    setAddedId(product.id);
    if (addedTimer.current) window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setAddedId(null), 900);
    notify(`${product.name} added to your cart`);
  };

  const changeQty = (id: string, delta: number) => {
    setCart((lines) =>
      lines
        .map((line) =>
          line.id === id ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    );
  };

  const toggleSaved = (product: Product) => {
    setSaved((ids) =>
      ids.includes(product.id)
        ? ids.filter((id) => id !== product.id)
        : [...ids, product.id],
    );
  };

  const chooseCategory = (tab: string) => {
    setPopularTab(tab);
    setPanel(null);
    document.getElementById("popular")?.scrollIntoView({ block: "start" });
  };

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const savedProducts = catalog.filter((product) => saved.includes(product.id));
  const shownPopular = popularProducts.filter(
    (product) => inPopularTab(product, popularTab) && inQuery(product, query),
  );
  const shownDeals = dealProducts.filter((product) => inQuery(product, query));
  const shownBest = bestProducts.filter(
    (product) => product.category === bestTab && inQuery(product, query),
  );

  const closeAnd = (href: string) => () => {
    setPanel(null);
    if (href === "#popular") setPopularTab("All");
  };

  const orderOnWhatsApp = (event: FormEvent) => {
    event.preventDefault();
    const name = customerName.trim();
    const phone = customerPhone.trim();
    const place = landmark.trim();
    if (
      !name ||
      !phone ||
      !deliveryArea ||
      !place ||
      !deliveryTime ||
      cart.length === 0
    ) {
      notify("Add your name, phone, landmark, and delivery time.");
      return;
    }
    const subtotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);
    const deliveryFee = shop.deliveryFee;
    const total = subtotal + deliveryFee;
    const price = (value: number) => money(value).replaceAll("\u00a0", " ");
    const updating =
      receipt !== null && Date.now() < Date.parse(receipt.changeUntil);
    const number = updating
      ? receipt.number
      : `AX-${Math.floor(1000 + Math.random() * 9000)}`;
    const changeUntil = updating
      ? receipt.changeUntil
      : new Date(Date.now() + 5 * 60 * 1000).toISOString();
    const lines = cart.map((line) => ({
      id: line.id,
      name: line.name,
      qty: line.qty,
      total: line.price * line.qty,
    }));
    const text = [
      updating
        ? `Updated order for ${shop.name}`
        : `New order for ${shop.name}`,
      `Order: ${number}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Area: ${deliveryArea}`,
      `Landmark: ${place}`,
      `When: ${deliveryTime}`,
      "",
      lines
        .map((line) => `${line.qty} x ${line.name} — ${price(line.total)}`)
        .join("\n"),
      "",
      `Subtotal: ${price(subtotal)}`,
      `Delivery: ${price(deliveryFee)}`,
      `Total: ${price(total)}`,
      "",
      "Please confirm this order on WhatsApp. I will pay on delivery.",
    ].join("\n");
    const whatsappUrl = `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;
    setReceipt({
      number,
      placedAt: new Date().toISOString(),
      shopName: shop.name,
      customerName: name,
      customerPhone: phone,
      area: deliveryArea,
      landmark: place,
      deliveryTime,
      changeUntil,
      lines,
      subtotal,
      deliveryFee,
      total,
      whatsappUrl,
    });
    setSlipOpen(true);
    setPanel(null);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const openReceipt = () => {
    setPanel(null);
    setSlipOpen(true);
  };

  const changeSeconds = receipt
    ? Math.max(0, Math.ceil((Date.parse(receipt.changeUntil) - now) / 1000))
    : 0;

  const startChange = () => {
    if (changeSeconds <= 0) return;
    setSlipOpen(false);
    setPanel("cart");
  };

  return (
    <div
      id="top"
      className="min-h-screen bg-page font-sans text-ink antialiased"
    >
      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 py-3 md:gap-5">
            <Logo />
            <div className="hidden min-w-0 flex-1 md:block">
              <SearchField
                id="header-search"
                value={query}
                placeholder="Search for fresh groceries, fruits, vegetables..."
                onChange={setQuery}
                onSubmit={onSearch}
              />
            </div>
            <div className="relative ml-auto flex items-center gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={() => toggle("orders")}
                className="hidden cursor-pointer flex-col items-center gap-0.5 px-2 text-ink md:flex"
              >
                <Package className="size-5" />
                <span className="text-[11px] font-medium text-muted">
                  Orders
                </span>
              </button>
              <button
                type="button"
                onClick={() => toggle("saved")}
                className="relative flex cursor-pointer flex-col items-center gap-0.5 px-2 text-ink"
              >
                <span className="relative">
                  <Heart className="size-5" />
                  {saved.length > 0 && (
                    <span className="absolute -top-2 -right-2 grid size-4 place-items-center rounded-full bg-sale text-[10px] font-bold text-white">
                      {saved.length}
                    </span>
                  )}
                </span>
                <span className="hidden text-[11px] font-medium text-muted lg:block">
                  Wishlist
                </span>
              </button>
              <button
                type="button"
                onClick={() => toggle("account")}
                className="hidden cursor-pointer flex-col items-center gap-0.5 px-2 text-ink md:flex"
              >
                <User className="size-5" />
                <span className="text-[11px] font-medium text-muted">
                  Account
                </span>
              </button>
              <button
                type="button"
                onClick={() => toggle("cart")}
                className="flex cursor-pointer flex-col items-center gap-0.5 px-2 text-ink"
                aria-label={`Cart, ${cartCount} items`}
              >
                <span className="relative">
                  <ShoppingCart className="size-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 grid size-4 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </span>
                <span className="hidden text-[11px] font-medium text-muted lg:block">
                  Cart
                </span>
              </button>
              <button
                type="button"
                className="grid size-10 cursor-pointer place-items-center rounded-lg text-ink md:hidden"
                aria-label={panel === "mobile" ? "Close menu" : "Open menu"}
                aria-expanded={panel === "mobile"}
                onClick={() => toggle("mobile")}
              >
                {panel === "mobile" ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>

              {panel === "orders" && (
                <MenuCard title="Orders">
                  <OrderNote
                    onOpenCart={() => setPanel("cart")}
                    receiptNumber={receipt?.number}
                    onViewReceipt={openReceipt}
                  />
                </MenuCard>
              )}
              {panel === "saved" && (
                <MenuCard title="Wishlist">
                  <SavedPanel
                    products={savedProducts}
                    onSave={toggleSaved}
                    onAdd={addToCart}
                  />
                </MenuCard>
              )}
              {panel === "account" && (
                <MenuCard title="Account">
                  <AccountCard location={shop.location} />
                </MenuCard>
              )}
              {panel === "cart" && (
                <MenuCard title="Cart" drop onClose={() => setPanel(null)}>
                  <CartPanel
                    lines={cart}
                    areas={shop.areas}
                    deliveryFee={shop.deliveryFee}
                    customerName={customerName}
                    customerPhone={customerPhone}
                    area={deliveryArea}
                    landmark={landmark}
                    deliveryTime={deliveryTime}
                    deliveryTimes={shop.deliveryTimes}
                    updating={changeSeconds > 0}
                    onQty={changeQty}
                    onCustomerNameChange={setCustomerName}
                    onCustomerPhoneChange={setCustomerPhone}
                    onAreaChange={setDeliveryArea}
                    onLandmarkChange={setLandmark}
                    onDeliveryTimeChange={setDeliveryTime}
                    onOrder={orderOnWhatsApp}
                  />
                </MenuCard>
              )}
            </div>
          </div>

          <div className="pb-3 md:hidden">
            <SearchField
              id="mobile-search"
              value={query}
              placeholder="Search fresh groceries..."
              onChange={setQuery}
              onSubmit={onSearch}
            />
          </div>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 border-t border-slate-100 py-2.5 md:flex"
          >
            <div className="relative">
              <button
                type="button"
                aria-expanded={panel === "categories"}
                onClick={() => toggle("categories")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                <Menu className="size-4" />
                All Categories
                <ChevronDown className="size-4" />
              </button>
              {panel === "categories" && (
                <ul className="absolute top-full left-0 z-50 mt-2 w-72 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        type="button"
                        onClick={() => chooseCategory(category.tab)}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-left text-sm font-medium hover:bg-brand-soft"
                      >
                        <img
                          src={category.image}
                          alt=""
                          className="size-9 rounded-full object-cover"
                        />
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <a
              href="#top"
              className="rounded-lg px-3 py-2 text-sm font-semibold hover:text-brand"
            >
              Home
            </a>
            <div className="relative">
              <button
                type="button"
                aria-expanded={panel === "shop"}
                onClick={() => toggle("shop")}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold hover:text-brand"
              >
                Shop
                <ChevronDown className="size-4" />
              </button>
              {panel === "shop" && (
                <ul className="absolute top-full left-0 z-50 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200">
                  {shopLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={closeAnd(link.href)}
                        className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-brand-soft"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <a
              href="#deals"
              className="rounded-lg px-3 py-2 text-sm font-semibold hover:text-brand"
            >
              Deals
            </a>
            <a
              href="#about"
              className="rounded-lg px-3 py-2 text-sm font-semibold hover:text-brand"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="rounded-lg px-3 py-2 text-sm font-semibold hover:text-brand"
            >
              Contact
            </a>
            <p className="ml-auto flex items-center gap-2 text-sm">
              <MapPin className="size-5 text-brand" />
              <span>
                <span className="block text-[11px] text-muted">Deliver to</span>
                <span className="font-semibold">{shop.location}</span>
              </span>
            </p>
          </nav>

          {panel === "mobile" && (
            <nav
              aria-label="Mobile"
              className="space-y-4 border-t border-slate-100 py-4 md:hidden"
            >
              <ul className="space-y-1">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setPanel(null)}
                      className="block rounded-xl px-2 py-2 font-semibold hover:bg-brand-soft"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-2 px-2 text-sm">
                <MapPin className="size-5 text-brand" />
                <span>
                  Deliver to{" "}
                  <span className="font-semibold">{shop.location}</span>
                </span>
              </p>
              <OrderNote
                onOpenCart={() => setPanel("cart")}
                receiptNumber={receipt?.number}
                onViewReceipt={openReceipt}
              />
              <AccountCard location={shop.location} />
            </nav>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-12 px-4 py-6 md:space-y-16 md:py-8">
        <section
          aria-label="Fresh groceries delivered to your doorstep"
          className="scroll-mt-32 overflow-hidden rounded-[28px] bg-linear-to-br from-[#dff6e8] via-[#f3fbf6] to-white p-5 shadow-sm ring-1 ring-emerald-100 md:p-8 lg:p-10"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-brand">
                FRESH • HEALTHY • ALWAYS
              </p>
              <h1 className="mt-3 max-w-xl text-4xl leading-[1.12] font-extrabold tracking-tight text-ink md:text-5xl">
                Fresh Groceries <span className="text-brand">Delivered</span> to
                Your Doorstep
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                Shop from a wide range of fresh fruits, vegetables, dairy,
                pantry staples and more. Quality you can trust, convenience
                you'll love.
              </p>
              <form
                onSubmit={onSearch}
                role="search"
                className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row"
              >
                <label className="relative min-w-0 flex-1">
                  <span className="sr-only">Search for products</span>
                  <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
                  <input
                    id="hero-search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search for products..."
                    className="w-full rounded-full bg-white py-3.5 pr-4 pl-11 text-sm shadow-sm outline-none ring-1 ring-emerald-100 focus:ring-2 focus:ring-brand/40"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white hover:bg-brand-dark"
                >
                  Shop Now
                  <ArrowRight className="size-4" />
                </button>
              </form>
            </div>
            <div className="relative">
              <img
                src={photo("photo-1610348725531-843dff563e2c", 1200)}
                alt="Basket of fresh vegetables, fruit, and herbs"
                className="aspect-4/3 w-full rounded-[28px] object-cover shadow-lg"
              />
              <p className="absolute top-4 right-4 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-brand shadow-md">
                Good Food Better Life
              </p>
            </div>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 border-t border-emerald-100/80 pt-5 lg:grid-cols-4">
            {[
              { icon: Leaf, label: "Fresh & Reliable Products" },
              { icon: Truck, label: "Fast & Reliable Delivery" },
              { icon: ShieldCheck, label: "Secure Payments" },
              { icon: RefreshCw, label: "Easy Returns" },
            ].map((perk) => {
              const Icon = perk.icon;
              return (
                <li key={perk.label} className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand shadow-sm ring-1 ring-emerald-100">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold leading-snug">
                    {perk.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          id="categories"
          aria-labelledby="categories-heading"
          className="scroll-mt-32"
        >
          <div className="mb-5 flex items-end justify-between gap-3">
            <h2
              id="categories-heading"
              className="text-2xl font-extrabold tracking-tight"
            >
              Shop by Category
            </h2>
            <a
              href="#popular"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand"
            >
              View All
              <ArrowRight className="size-4" />
            </a>
          </div>
          <ul className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-8 lg:overflow-visible">
            {categories.map((category) => (
              <li
                key={category.name}
                className="w-28 shrink-0 snap-start lg:w-auto"
              >
                <button
                  type="button"
                  onClick={() => chooseCategory(category.tab)}
                  className="flex w-full cursor-pointer flex-col items-center gap-2.5 rounded-2xl bg-white px-2 py-4 text-center shadow-sm ring-1 ring-slate-200/80 transition hover:-translate-y-0.5 hover:ring-brand/30"
                >
                  <img
                    src={category.image}
                    alt=""
                    className="size-16 rounded-full object-cover"
                  />
                  <span className="text-xs leading-tight font-semibold">
                    {category.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Promotions" className="grid gap-4 lg:grid-cols-3">
          <article className="relative min-h-56 overflow-hidden rounded-3xl bg-linear-to-br from-[#3cb56a] to-[#157a3e] p-6 text-white">
            <div className="relative z-10 max-w-48">
              <h2 className="text-2xl leading-tight font-extrabold">
                Fresh Fruits
                <br />
                Up to 30% Off
              </h2>
              <a
                href="#popular"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand"
              >
                Shop Now
                <ArrowRight className="size-4" />
              </a>
            </div>
            <img
              src={photo("photo-1619566636858-adf3ef46400b", 700)}
              alt="Assorted fresh fruit"
              className="absolute -right-2 -bottom-4 size-44 rounded-full object-cover ring-4 ring-white/25"
            />
          </article>
          <article className="relative min-h-56 overflow-hidden rounded-3xl bg-linear-to-br from-[#f6a23a] to-[#ef7d1a] p-6 text-white">
            <div className="relative z-10 max-w-48">
              <h2 className="text-2xl leading-tight font-extrabold">
                Daily Essentials
                <br />
                Better Prices Every Day
              </h2>
              <a
                href="#deals"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-deal"
              >
                Shop Now
                <ArrowRight className="size-4" />
              </a>
            </div>
            <img
              src={photo("photo-1586201375761-83865001e31c", 700)}
              alt="Rice and pantry staples"
              className="absolute -right-2 -bottom-4 size-44 rounded-full object-cover ring-4 ring-white/25"
            />
          </article>
          <article className="relative min-h-56 overflow-hidden rounded-3xl bg-linear-to-br from-[#0f4f45] to-[#16344a] p-6 text-white">
            <div className="relative z-10 max-w-48">
              <h2 className="text-2xl leading-tight font-extrabold">
                Organic Products
                <br />
                Pure & Natural
              </h2>
              <a
                href="#bestsellers"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f4f45]"
              >
                Shop Now
                <ArrowRight className="size-4" />
              </a>
            </div>
            <img
              src={photo("photo-1540420773420-3366772f4999", 700)}
              alt="Organic leafy greens"
              className="absolute -right-6 bottom-0 h-48 w-40 object-cover opacity-90"
            />
            <p className="absolute top-4 right-4 grid size-16 place-items-center rounded-full border-2 border-dashed border-white/80 text-center text-[11px] leading-tight font-bold">
              100%
              <br />
              Organic
            </p>
          </article>
        </section>

        <section
          id="popular"
          aria-labelledby="popular-heading"
          className="scroll-mt-32"
        >
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2
              id="popular-heading"
              className="text-2xl font-extrabold tracking-tight"
            >
              Popular Products
            </h2>
            <FilterTabs
              label="Popular product categories"
              tabs={popularTabs}
              active={popularTab}
              onChange={setPopularTab}
            />
          </div>
          {query.trim() && (
            <p className="mb-4 text-sm text-muted">
              Showing results for “{query.trim()}”
            </p>
          )}
          <ProductGrid
            products={shownPopular}
            saved={saved}
            addedId={addedId}
            onAdd={addToCart}
            onSave={toggleSaved}
            empty="No products match that search. Try bananas, milk, or mangoes."
          />
        </section>

        <section className="overflow-hidden rounded-3xl bg-brand-deep text-white">
          <div className="grid items-center md:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 md:p-10">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                Daily Fresh Deals
              </h2>
              <p className="mt-2 max-w-md text-white/80">
                Save more on your favorite products.
              </p>
              <a
                href="#deals"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-deep"
              >
                View Deals
                <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="relative min-h-52">
              <img
                src={photo("photo-1488459716781-31db52582fe9", 1000)}
                alt="Market basket of mixed produce"
                className="h-full min-h-52 w-full object-cover"
              />
              <p className="absolute top-1/2 right-6 grid size-24 -translate-y-1/2 place-items-center rounded-full bg-deal text-center leading-tight font-extrabold text-white shadow-lg">
                <span>
                  Up to
                  <br />
                  <span className="text-2xl">50%</span>
                  <br />
                  OFF
                </span>
              </p>
            </div>
          </div>
        </section>

        <section
          id="deals"
          aria-labelledby="deals-heading"
          className="scroll-mt-32"
        >
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <h2
                id="deals-heading"
                className="text-2xl font-extrabold tracking-tight"
              >
                Deals Of The Day
              </h2>
              <DealsTimer secondsLeft={secondsLeft} />
            </div>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-brand"
            >
              View All Deals
              <ArrowRight className="size-4" />
            </button>
          </div>
          <ProductGrid
            products={shownDeals}
            saved={saved}
            addedId={addedId}
            onAdd={addToCart}
            onSave={toggleSaved}
            empty="None of today's deals match that search."
            columns={4}
          />
        </section>

        <section aria-label="Offers" className="grid gap-4 md:grid-cols-2">
          <article className="relative min-h-56 overflow-hidden rounded-3xl bg-brand-deep p-6 text-white md:p-8">
            <div className="relative z-10 max-w-xs">
              <h2 className="text-3xl leading-tight font-extrabold">
                Order on WhatsApp
                <br />
                Pay on delivery
              </h2>
              <p className="mt-3 text-sm text-white/80">
                We confirm your cart in the chat before we pack. You pay when
                the order arrives.
              </p>
              <a
                href="#popular"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-deep"
              >
                Shop Now
                <ArrowRight className="size-4" />
              </a>
            </div>
            <img
              src={photo("photo-1617347454431-f49d7ff5c3b1", 800)}
              alt="Courier riding a scooter with a grocery delivery"
              className="absolute right-0 bottom-0 hidden h-48 w-56 object-cover md:block"
            />
          </article>
          <article className="relative min-h-56 overflow-hidden rounded-3xl bg-linear-to-br from-[#ff9f45] to-[#f07a12] p-6 text-white md:p-8">
            <div className="relative z-10 max-w-xs">
              <h2 className="text-3xl leading-tight font-extrabold">
                Join Gambia Fresh
                <br />
                Rewards Program
              </h2>
              <p className="mt-3 text-sm text-white/90">
                Earn points & get exclusive offers.
              </p>
              <a
                href="#about"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-deal"
              >
                Learn More
                <ArrowRight className="size-4" />
              </a>
            </div>
            <img
              src={photo("photo-1549465220-1a8b9238cd48", 800)}
              alt="Wrapped gift boxes"
              className="absolute -right-4 bottom-0 hidden h-48 w-56 rounded-tl-[40px] object-cover md:block"
            />
          </article>
        </section>

        <section
          id="needs"
          aria-labelledby="needs-heading"
          className="scroll-mt-32"
        >
          <h2
            id="needs-heading"
            className="mb-5 text-2xl font-extrabold tracking-tight"
          >
            Shop by Needs
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {needs.map((need) => (
              <li key={need.title}>
                <a
                  href="#popular"
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <img
                    src={need.image}
                    alt=""
                    className="size-16 rounded-xl object-cover"
                  />
                  <span>
                    <span className="block font-bold">{need.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {need.text}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="bestsellers"
          aria-labelledby="best-heading"
          className="scroll-mt-32"
        >
          <h2
            id="best-heading"
            className="mb-4 text-2xl font-extrabold tracking-tight"
          >
            Best Selling Products
          </h2>
          <div className="mb-5">
            <FilterTabs
              label="Best seller categories"
              tabs={bestTabs}
              active={bestTab}
              onChange={setBestTab}
            />
          </div>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {shownBest.map((product) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  saved={saved.includes(product.id)}
                  added={addedId === product.id}
                  onAdd={addToCart}
                  onSave={toggleSaved}
                />
              </li>
            ))}
          </ul>
          {shownBest.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center text-sm text-muted">
              No best sellers match that search in {bestTab.toLowerCase()}.
            </p>
          )}
        </section>

        <section
          id="about"
          aria-labelledby="about-heading"
          className="relative scroll-mt-32 overflow-hidden rounded-[28px]"
        >
          <img
            src={photo("photo-1464226184884-fa280b87c399", 1600)}
            alt="Green farmland at sunrise"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-black/10" />
          <div className="relative z-10 max-w-xl px-6 py-12 text-white md:px-12 md:py-16">
            <h2
              id="about-heading"
              className="text-3xl leading-tight font-extrabold md:text-5xl"
            >
              Good Food Brings People Together
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
              At Gambia Fresh, we're committed to providing you with the
              freshest products, best prices and a healthier tomorrow.
            </p>
            <a
              href="#popular"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Shop Now
              <ArrowRight className="size-4" />
            </a>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="relative scroll-mt-32 bg-brand-deep text-white"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-4 text-sm text-white/75">
              Fresh Food • Happy Life
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">
              Morning markets, packed with care, and delivered the same day in{" "}
              {shop.areas.join(", ")}.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wide uppercase">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wide uppercase">
              Categories
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {footerCategories.map((name) => (
                <li key={name}>
                  <a href="#categories" className="hover:text-white">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wide uppercase">
              Get in Touch
            </h2>
            <address className="mt-4 space-y-3 text-sm text-white/80 not-italic">
              <p className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                <a href={`tel:+${shop.whatsapp}`}>{shop.phoneDisplay}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                <a href={`mailto:${shop.email}`}>{shop.email}</a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                {shop.location}
              </p>
            </address>
            <ul className="mt-4 flex gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href="#contact"
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 fill-current"
                      aria-hidden
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {legal && (
          <p className="mx-auto max-w-7xl px-4 pb-2 text-sm text-white/80">
            {legalCopy[legal]}
          </p>
        )}
        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Gambia Fresh. All rights reserved.</p>
            <ul className="flex flex-wrap gap-4">
              {(
                [
                  ["privacy", "Privacy Policy"],
                  ["terms", "Terms & Conditions"],
                  ["help", "Help"],
                ] as const
              ).map(([key, label]) => (
                <li key={key}>
                  <button
                    type="button"
                    aria-expanded={legal === key}
                    onClick={() =>
                      setLegal((current) => (current === key ? null : key))
                    }
                    className="cursor-pointer hover:text-white"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-8 flex justify-center"
          aria-hidden
        >
          <Leaf className="size-14 -rotate-45 text-[#2f9d55]" />
          <Leaf className="-mt-3 size-20 text-[#1f8a48]" />
          <Leaf className="size-14 rotate-45 text-[#2f9d55]" />
        </div>
      </footer>
      <div className="h-14 bg-page" />

      {slipOpen && receipt && (
        <OrderSlip
          receipt={receipt}
          secondsLeft={changeSeconds}
          onClose={() => setSlipOpen(false)}
          onPrint={() => window.print()}
          onChange={startChange}
        />
      )}

      {toast && (
        <p
          role="status"
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </p>
      )}
    </div>
  );
};
