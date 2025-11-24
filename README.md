## NgRx Store Cart Manager Application - Angular v20.3.4

This project is a modern, standalone Angular application built to demonstrate robust, scalable state management using the NgRx pattern for an e-commerce catalog and shopping cart system.
**Live Demo:** https://cart-manager-ten.vercel.app/

🚀 Key Technologies

- **Framework:** Angular v20.3.4 (Standalone Components, Signals, inject())

- **State Management:** NgRx (Store, Selectors, Reducers, Effects)

- **Routing:** Angular Router (for multi-page navigation and parameter handling)

- **Data Source:** FakeStore API


## ✨ Core Features Implemented

The application showcases an end-to-end flow, emphasizing complex asynchronous state management:

| Feature | NgRx Implementation |
| :--- | :--- |
| **Asynchronous Product Loading** | Uses `ProductEffects` to fetch data from a public API, dispatching `LoadProductsSuccess`/`Failure` actions to manage a `loading` state in the UI. |
| **Global Stock Awareness** | The `ProductCardComponent` uses `store.selectSignal` to monitor the quantity of that item *already* in the cart. This prevents overselling and correctly disables the `+` button. |
| **UI Feedback & Toasts** | Uses a global state (`ProductState.error`) combined with a **3-second auto-dismissing Effect** (`clearError$`) to show API errors as toasts. |
| **Product Search/Filter** | Implemented client-side filtering by updating a `searchTerm` in the store and using a **memoized selector** (`selectFilteredProducts`) to perform filtering logic without component intervention. |
| **Routing & Persistence** | Uses route parameters (`/product/:id/:name`) and ensures that the data loads correctly even if a user navigates directly to a details page (by dispatching `loadProducts` in the `ProductDetailsComponent` constructor if the store is empty). |


## 🏗️ NgRx Architecture Overview
The state is split into two distinct slices:

| Slice | Purpose | Key Actions | Key Selectors |
| :--- | :--- | :--- | :--- |
| **products** | Reference data (the catalog)| `loadProducts`, `setSearchTerm` | `selectFilteredProducts`, `selectProductById` |
| **cart** | Transactional data (user's items)| `addItem` (Triggers Effect), `updateQuantity`, `removeItem` | `selectCartTotalQuantity`, `selectCartTotalAmount` |

# The Critical `Add to Cart` Flow

The process of adding an item is completely asynchronous and robust:

**Component:** `ProductListComponent` dispatches `[Cart] Add Item ({ productId, quantity })`.

**Effect:** `CartEffects` intercepts this action, uses `selectProductById` to look up the full `name` and `price` from the Product State.

**Effect Dispatches:** It then dispatches `[Cart] Add Item Ready` (or `Failed` if the lookup fails).

**Reducer:** The `CartReducer` receives the complete, verified payload and immutably updates the normalized cart state.


## 🛠️ Installation and Setup

Install Dependencies (Code Editor Block)

Use the following commands to install required packages:

```
npm install
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools
```

## Debugging

For full visibility into the NgRx state transitions, actions, and effect flows, install the Redux DevTools browser extension (Chrome/Firefox).

The application is configured to connect automatically via ```provideStoreDevtools``` in ```app.config.ts.```


