import { useState } from "react";
import { Route, Switch } from "wouter";
import { Header } from "./header";
import { Menu } from "./menu";
import { Home } from "./home";
import { Product } from "./product";
import "./App.css";

function App() {
  const [showMenu, toggleShowMenu] = useState(false);

  return (
    <>
      <Header showMenu={showMenu} toggleShowMenu={toggleShowMenu} />
      <main>
        <div className={showMenu ? "show-menu" : "hide-menu"}>
          <Menu />
        </div>
        {!showMenu && (
          <Switch>
            <Route path="/" component={Home}></Route>
            <Route path="/home" component={Home} nest></Route>
          </Switch>
        )}
      </main>
    </>
  );
}

export default App;
