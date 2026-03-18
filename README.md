# 🛒 Products Hub

This is a simple e-commerce-style product listing app built using Next.js. It includes product listing, filters, pagination, and a product detail page.

---

## 🚀 Setup

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm run dev
```

3. Open in browser:

```
http://localhost:3000
```

---

## ⚙️ Assumptions

- Data is coming from the DummyJSON API.
- The API doesn’t support all filters (like price and brand), so those are handled on the frontend.
- Some products might not have complete data (like brand or reviews), so basic checks are added.
- Pagination is handled using `limit` and `skip`.

---

## 🧱 Approach & Decisions

- Used Next.js App Router for structure and routing.
- Kept filters in the URL so they persist when navigating back or refreshing.
- Separated responsibilities:
  - Products page handles API calls, filters, and pagination.
  - Filters component only manages UI and updates the URL.
  - ProductCard is reusable for listing.

- Used Tailwind for quick and clean UI.
- Combined API filtering (category) with client-side filtering (price, brand).

---

## 🔧 If I Had More Time

- Add React Query for better data handling and caching.
- Improve loading states with skeleton UI.
- Debounce filter inputs to avoid too many API calls.
- Move all filtering to backend (if API allows).
- Add search functionality.
- Improve mobile UI and polish interactions.
- Add cart / wishlist features.
- Add tests.
- Sync pagination with URL as well.

---

## 🛠 Tech Used

- Next.js
- React
- Tailwind CSS
- Axios

---

## ✨ Features

- Product listing grid
- Filters (category, price, brand)
- Pagination
- Product detail page
- Image gallery and reviews
- URL-based filter persistence

---
