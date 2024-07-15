import { useWindowDimensions } from "./hooks/windowDimension";
import ArrowURL from "./assets/arrow.svg";
import classes from "./scrollable_navigation.module.css";

import { MOBILE_WIDTH } from "./constants";

export function ScrollableNavigation({
  page,
  setPage,
  componentId,
  totalLength,
  idString,
}) {
  // Current window width
  const { width } = useWindowDimensions();

  function setPageAndScroll(nextPage) {
    // Set page number
    setPage(nextPage);
    // Scroll to the corresponding element id
    document
      .getElementById(componentId + idString + nextPage)
      .scrollIntoView(true);
  }

  // We only want to show the pagination for desktop screens
  let numberPagination = [];

  if (width > MOBILE_WIDTH) {
    for (let index = 0; index < totalLength; index++) {
      numberPagination.push(
        <button
          className={
            classes["nav-button"] + " " + (index === page && classes["active"])
          }
          key={componentId + "-button-" + index}
          onClick={() => {
            setPageAndScroll(index);
          }}
        >
          {index + 1}
        </button>
      );
    }
  } else {
    // The presentation bullets will be shown for the mobile screens
    numberPagination = (
      <div className={classes["bullets"]} role="presentation">
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  return (
    <>
      <nav className={classes["navigation"]}>
        <button
          className={classes["nav-button"] + " " + classes["arrow"]}
          onClick={() => {
            const nextPage = (totalLength + page - 1) % totalLength;
            setPageAndScroll(nextPage);
          }}
        >
          <img src={ArrowURL}></img>
        </button>
        {numberPagination}
        <button
          className={
            classes["nav-button"] +
            " " +
            classes["arrow"] +
            " " +
            classes["right-arrow"]
          }
          onClick={() => {
            const nextPage = (page + 1) % totalLength;
            setPageAndScroll(nextPage);
          }}
        >
          <img src={ArrowURL}></img>
        </button>
      </nav>
    </>
  );
}
