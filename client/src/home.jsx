import { useState, useEffect } from "react";
import { Loader } from "./loader";
import { Hero } from "./hero";
import { WhatsNew } from "./whats_new";
import { WhatElseNew } from "./what_else_new";
import ArchimedesURL from "./assets/archimedes.webp";
import FlowerURL from "./assets/flower.webp";

import classes from "./home.module.css";

export function Home() {
  const [modelData, setModelData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/home_model.json");
      const data = await res.json();
      setModelData(data);
    }
    fetchData();
  }, []);

  if (modelData === null) return <Loader />;

  return (
    <>
      <Hero data={modelData.heroContent} />
      <section className={classes["main-content"]}>
        <h1 className={classes["main-welcome-msg"]}>
          Welcome to Trader Joe's!
        </h1>
        <div className={classes["whats-new-podcasts-container"]}>
          <section className={classes["whats-new-section"]}>
            <WhatsNew articles={modelData.whatsNew} />
          </section>
          <picture className={classes["flower-img"]}>
            <img src={FlowerURL} />
          </picture>
        </div>

        <div className={classes["what-else-new-section"]}>
          <WhatElseNew />
          <picture>
            <img src={ArchimedesURL} />
          </picture>
        </div>
        <br></br>
        <br></br>
      </section>
    </>
  );
}
