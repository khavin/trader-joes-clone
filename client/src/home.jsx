import { useEffect, useState } from "react";
import { Hero } from "./hero";
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
        <Hero data={modelData.heroContent} />
      )}
    </>
  );
}
