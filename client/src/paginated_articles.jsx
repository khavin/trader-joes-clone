import { useId, useState } from "react";
import { useWindowDimensions } from "./hooks/windowDimension";
import ArrowURL from "./assets/arrow.svg";
import classes from "./paginated_articles.module.css";

const MOBILE_WIDTH = 900;

export function PaginatedArticles({ articles }) {
  const componentId = useId();
  const [page, setPage] = useState(0);
  const { width } = useWindowDimensions();

  function setPageAndScroll(nextPage) {
    setPage(nextPage);
    document
      .getElementById(componentId + "-article-" + nextPage)
      .scrollIntoView(true);
  }

  const elements = articles.map((article, index) => {
    return (
      <article
        id={componentId + "-article-" + index}
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
          <a href={article.link}>{article.title}</a>
        </h3>
        <p className={classes["content"]}>{article.content}</p>
      </article>
    );
  });

  const numberPagination =
    width > MOBILE_WIDTH ? (
      articles.map((_, index) => {
        return (
          <button
            className={
              classes["nav-button"] +
              " " +
              (index === page && classes["active"])
            }
            key={componentId + "-button-" + index}
            onClick={() => {
              setPageAndScroll(index);
            }}
          >
            {index + 1}
          </button>
        );
      })
    ) : (
      <div className={classes["bullets"]} role="presentation">
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  return (
    <>
      <div className={classes["scroll-container"]}>{elements}</div>
      <nav className={classes["article-navigation"]}>
        <button
          className={classes["nav-button"] + " " + classes["arrow"]}
          onClick={() => {
            const nextPage = (articles.length + page - 1) % articles.length;
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
            const nextPage = (page + 1) % articles.length;
            setPageAndScroll(nextPage);
          }}
        >
          <img src={ArrowURL}></img>
        </button>
      </nav>
    </>
  );
}
