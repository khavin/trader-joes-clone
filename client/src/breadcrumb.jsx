import { Link } from "wouter";
import classes from "./breadcrumb.module.css";
import LeftNavSvgURL from "./assets/left_nav.svg";
export function BreadCrumb({ paths }) {
  return (
    <ol className={classes["breadcrumb"]}>
      {paths.map((path, index) => {
        if (index === paths.length - 1) {
          // The last item in paths should be displayed as plain text and not as link
          return (
            <li className={classes["last-path"]} key={path.name}>
              {path.name}
            </li>
          );
        } else
          return (
            <li key={path.name} className={classes["link"]}>
              <Link className={classes["link-text"]} to={path.url}>
                {path.name}
              </Link>{" "}
              <img className={classes["divider"]} src={LeftNavSvgURL}></img>
            </li>
          );
      })}
    </ol>
  );
}
