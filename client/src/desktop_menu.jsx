import classes from "./desktop_menu.module.css";
/**
 * Desktop menu component that shows the menu as columns
 *
 * @param {*} data menu data and the order of section titles
 * @return DesktopMenu component
 */
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

  return <nav className={"menu " + classes["section-grid"]}>{columns}</nav>;
}

/**
 * MenuSection component that shows the links of a section
 *
 * @param {*} sectionData
 * @returns MenuSection component
 */
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

/**
 * The function creates the class name based on the link level
 *
 * @param {*} level link level
 * @returns CSS class name
 */
function getClassBasedOnLinkLevel(level) {
  if (level === undefined || level === null) {
    level = 3;
  }

  return "link-level-" + level;
}

/**
 * The function creates a new array by recursively appending the "children" property
 * values and flattening them before returning.
 *
 * @param {*} obj The menu object to flatten
 * @returns Array of children values
 */
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
