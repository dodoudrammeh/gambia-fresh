# Gambia Fresh — build spec

## Stack

- React and TypeScript, rendered from `src/main.tsx`
- Tailwind CSS v4, with brand colors and Plus Jakarta Sans declared in `src/index.css`
- Lucide React for the leaf logo, search, cart, delivery, payment, and contact icons
- Unsplash photos for produce, pantry, delivery, and the farm banner

## Page order

1. Header: Gambia Fresh gambiafresh.com logo, product search, Track Order, Wishlist, Account, and Cart
2. Nav: All Categories, Home, Shop, Deals, About Us, Contact, and “Deliver to Busumbala, The Gambia”. Prices are shown in Gambian dalasi (GMD).
3. Hero: “Fresh Groceries Delivered to Your Doorstep”, product search, Shop Now, produce photo, and the four trust points
4. Shop by Category: eight category cards
5. Three promos: Fresh Fruits, Daily Essentials, Organic Products
6. Popular Products with category tabs and two rows of products
7. Daily Fresh Deals banner with the “Up to 50% OFF” badge
8. Deals of the Day with a live countdown and four discounted products
9. Free delivery (`WELCOME`) and Gambia Fresh Rewards cards
10. Shop by Needs: Quick Meals, Healthy Living, Budget Friendly, Family Packs
11. Best Selling Products, opening on Fruits
12. “Good Food Brings People Together”
13. Footer: brand, quick links, categories, contact, social links, and legal line

## Responsive behavior

- Desktop keeps the search in the header, the category bar, and multi-column product grids (five popular products across, four deals and best sellers).
- Below the medium breakpoint the search drops under the logo, Track Order and Account move into the menu, and category cards scroll sideways.
- Promo cards, offer cards, needs, and footer columns stack into one or two columns.
- Section headings use `scroll-mt` so the sticky header does not cover them.

## Behavior

- Search filters Popular Products, Deals of the Day, and Best Sellers, then scrolls to the product list.
- Category tabs and the All Categories menu change which products are shown.
- Add to Cart updates the cart badge. The cart panel can change quantity and shows a subtotal.
- Hearts save items to the wishlist badge in the header.
- The deals countdown starts at 12:36:24 and ticks down.
- Track Order, Account, Privacy, Terms, and Help open short on-page notes. There is no backend.

## Files

- `src/App.tsx` — the full page
- `src/index.css` — Tailwind theme tokens
- `index.html` — title, description, and font
- `vite.config.ts` — the dev server ignores `desgin` so an open design image does not crash the file watcher
