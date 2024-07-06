import classes from "./hero.module.css";

export function Hero({ data }) {
  return (
    <div className={classes["hero-container"]}>
      <section className={classes["hero-section"]}>
        <h2 className={classes["hero-title"]}>{data.title}</h2>
        <p className={classes["hero-content"]}>{data.content}</p>
        <button className={"primary-button"}>
          {data.callToAction.content}
        </button>
      </section>
      <img className={classes["hero-img"]} src={data.imageLink}></img>
    </div>
  );
}
