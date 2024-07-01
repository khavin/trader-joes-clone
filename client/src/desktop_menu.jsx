import classes from "./desktop_menu.module.css";

export function DesktopMenu({ data }) {
  const columns = data.desktopOrder.map((sectionNames, index) => {
    return (
      <div
        className={
          classes["section-column"] +
          " " +
          (index + 1 !== data.desktopOrder.length &&
            classes["section-column-with-border"])
        }
        key={sectionNames.join("-")}
      >
        {sectionNames.map((sectionName) => {
          const sectionData = data.children.find(
            (item) => item.label === sectionName
          );
          if (sectionData === undefined) return null;
          return <MenuSection key={sectionName} sectionData={sectionData} />;
        })}
      </div>
    );
  });

  return <nav className={classes["section-grid"]}>{columns}</nav>;
}

function MenuSection({ sectionData }) {
  const sectionItems = flatObjects(sectionData);
  return (
    <div className={classes["menu-section"]}>
      <ul className={classes["menu-links"]}>
        {sectionItems.map((item) => (
          <li key={item.label}>
            <a
              className={
                classes["menu-link"] +
                " " +
                classes[getClassBasedOnLinkLevel(item.linkLevel)]
              }
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      {sectionData.image && (
        <img className={classes["section-image"]} src={sectionData.image} />
      )}
    </div>
  );
}

function getClassBasedOnLinkLevel(level) {
  if (level === undefined || level === null) {
    level = 3;
  }

  return "link-level-" + level;
}

function flatObjects(obj) {
  if (obj.children === undefined) return [obj];
  const items = obj.children.map((item) => {
    if (item.children) {
      return flatObjects(item);
    } else {
      return item;
    }
  });

  return [obj, items].flat(Infinity);
}
