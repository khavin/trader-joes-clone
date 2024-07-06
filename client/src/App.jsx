import { useState } from "react";

import { Header } from "./header";
import { Menu } from "./menu";
import { Home } from "./home";
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
        {!showMenu && <Home></Home>}
      </main>
    </>
  );
}

export default App;
