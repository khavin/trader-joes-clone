import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import { Hero } from "./hero";
import { WhatsNew } from "./whats_new";
import { Product } from "./product";
import { BelieveEatOrNotRecipes } from "./Believe_Eat_Or_Not_Recipes";
import { Podcasts } from "./podcasts";
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
      <Route path="/products*" component={Product}></Route>
      <Route path="/products/categories/:category" component={Product}></Route>

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

              <section
                className={classes["believe-eat-or-not-recipes-section"]}
              >
                <BelieveEatOrNotRecipes />
              </section>
              <br></br>
              <br></br>
            </section>
          </>
        )}
      </Route>
    </Switch>
  );
}
