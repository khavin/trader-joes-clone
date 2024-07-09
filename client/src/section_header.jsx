import classes from "./section_header.module.css";

export function SectionHeader({ title, imageLink }) {
  console.log(imageLink);
  return (
    <h2
      className={
        classes["title"] + " " + (imageLink && classes["title-with-img"])
      }
    >
      {title}
      {imageLink && <img src={imageLink}></img>}
    </h2>
  );
}
