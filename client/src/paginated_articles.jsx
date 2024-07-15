import { useId, useState } from "react";
import { useWindowDimensions } from "./hooks/windowDimension";
import { ScrollableNavigation } from "./scrollable_navigation";
import classes from "./paginated_articles.module.css";

import { MOBILE_WIDTH } from "./constants";

export function PaginatedArticles({ articles }) {
  const componentId = useId();
  const [page, setPage] = useState(0);
  // Current window width
  const { width } = useWindowDimensions();

  const idString = "-article-";

  // Create article elements
  const elements = articles.map((article, index) => {
    // Articles should not be navigated using tabs in desktop view.
    // Set tab index as "0" for the article element in view and as "-1" for the others. This will disable scrolling to next/previous article using tab. Users should be able to navigate to other articles only using pagination.
    const conditionalAttributes = {};
    // Only for desktop view
    if (width > MOBILE_WIDTH) {
      conditionalAttributes["tabIndex"] = page === index ? "0" : "-1";
    }

    return (
      <article
        id={componentId + idString + index}
        className={classes["article"]}
        key={article.title}
      >
        <picture className={classes["article-img"]}>
          {article.image.map((imgObj) => {
            if (imgObj.type === "img")
              return (
                <img
                  key={imgObj.type + "_" + imgObj.src}
                  src={imgObj.src}
                ></img>
              );
          })}
        </picture>
        <h3 className={classes["title"]}>
          <a {...conditionalAttributes} href={article.link}>
            {article.title}
          </a>
        </h3>
        <p className={classes["content"]}>{article.content}</p>
      </article>
    );
  });

  return (
    <>
      <div className={classes["scroll-container"]}>{elements}</div>
      <ScrollableNavigation
        componentId={componentId}
        totalLength={articles.length}
        page={page}
        setPage={setPage}
        idString={idString}
      />
    </>
  );
}
