import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { Loader } from "./loader";

// Lazy load modules
const Products = lazy(() =>
  import("./products").then((module) => ({ default: module.Products }))
);
const ShoppingList = lazy(() =>
  import("./shopping_list").then((module) => ({ default: module.ShoppingList }))
);
const Home = lazy(() =>
  import("./home").then((module) => ({ default: module.Home }))
);

// Create suspense components for modules
const ProductsSuspense = () => (
  <Suspense fallback={<Loader />}>
    <Products />
  </Suspense>
);
const ShoppingListSuspense = () => (
  <Suspense fallback={<Loader />}>
    <ShoppingList />
  </Suspense>
);

export function Router() {
  return (
    <Switch>
      <Route path="/shopping-list" component={ShoppingListSuspense}></Route>
      <Route path="/products*" component={ProductsSuspense}></Route>
      <Route
        path="/products/categories/:category"
        component={ProductsSuspense}
      ></Route>

      <Route>
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      </Route>
    </Switch>
  );
}
