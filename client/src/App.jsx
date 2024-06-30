import { useState } from "react";

import { Header } from "./header";
import { Menu } from "./menu";
import "./App.css";

function App() {
  const [showMenu, toggleShowMenu] = useState(false);

  return (
    <>
      <Header showMenu={showMenu} toggleShowMenu={toggleShowMenu} />
      <div className={showMenu ? "show-menu" : "hide-menu"}>
        <Menu />
      </div>
    </>
  );
}

export default App;
