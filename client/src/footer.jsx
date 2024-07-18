import LogoURL from "./assets/logo.svg";
import AnimalURL from "./assets/animal.webp";
import classes from "./footer.module.css";
export function Footer() {
  return (
    <footer className={classes["container"]}>
      <ul className={classes["menu-container"]}>
        <li className={classes["menu"]}>
          <span className={classes["menu-tag"]}>The Fearless Flyer</span>
          <button className={"primary-button"}>GET IT</button>
        </li>
        <li className={classes["menu"]}>
          <span className={classes["menu-tag"]}>The Podcast</span>
          <button className={"primary-button"}>LISTEN</button>
        </li>
        <li className={classes["menu"]}>
          <span className={classes["menu-tag"]}>Recipes</span>
          <button className={"primary-button"}>TRY</button>
          <img className={classes["footer-animal"]} src={AnimalURL} />
        </li>
      </ul>
      <div className={classes["copyright-container"]}>
        <img className={classes["logo"]} src={LogoURL} />
      </div>
    </footer>
  );
}
