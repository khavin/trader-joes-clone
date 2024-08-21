import { useState } from "react";
import { Route, Switch } from "wouter";
import { Header } from "./header";
import { Footer } from "./footer";
import { Menu } from "./menu";
import { Router } from "./router";
import { ShoppingListContext } from "./contexts/ShoppingListContext";
import "./App.css";

function App() {
  const [showMenu, toggleShowMenu] = useState(false);
  const [shoppingList, setShoppingList] = useState(Object.create(null));

  return (
    <>
      <ShoppingListContext.Provider value={[shoppingList, setShoppingList]}>
        <Header showMenu={showMenu} toggleShowMenu={toggleShowMenu} />
        {/* TODO: This is a mistake. Menu component should be present inside header and not inside main. */}
        <div className={showMenu ? "show-menu" : "hide-menu"}>
          <Menu />
        </div>
        {!showMenu && (
          <main>
            <Switch>
              <Route path="/" component={Router}></Route>
              <Route path="/home" component={Router} nest></Route>
            </Switch>
            <Footer></Footer>
          </main>
        )}
      </ShoppingListContext.Provider>
    </>
  );
}

export default App;
