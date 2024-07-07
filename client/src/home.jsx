import { useEffect, useState } from "react";
import { Hero } from "./hero";
import { WhatsNew } from "./whats_new";
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
    <>
      {modelData === null ? (
        <p>Loading ...</p>
      ) : (
        <>
          <Hero data={modelData.heroContent} />
          <section className={classes["main-content"]}>
            <h1 className={classes["main-welcome-msg"]}>
              Welcome to Trader Joe's!
            </h1>
            <section className={classes["whats-new-section"]}>
              <WhatsNew articles={modelData.whatsNew} />
            </section>
            <br></br>
            <br></br>
          </section>
        </>
      )}
    </>
  );
}
