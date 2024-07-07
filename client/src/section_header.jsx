import classes from "./section_header.module.css";

export function SectionHeader({ title, imageLink }) {
  return (
    <h2 className={classes["title"]}>
      {title}
      {imageLink && <img src={imageLink}></img>}
    </h2>
  );
}
