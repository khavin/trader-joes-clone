import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import { Hero } from "./hero";
import { WhatsNew } from "./whats_new";
import { WhatElseNew } from "./what_else_new";
import { Products } from "./products";
import { Podcasts } from "./podcasts";
import ArchimedesURL from "./assets/archimedes.webp";

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
  return (
    <Switch>
      <Route path="/products*" component={Products}></Route>
      <Route path="/products/categories/:category" component={Products}></Route>

      <Route>
        {modelData === null ? (
          <p>Loading ...</p>
        ) : (
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
                <section className={classes["podcasts-section"]}>
                  <Podcasts />
                </section>
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
        )}
      </Route>
    </Switch>
  );
}
