import classes from "./paginated_articles.module.css";

export function PaginatedArticles({ articles }) {
  const elements = articles.map((article) => {
    return (
      <article key={article.title}>
        <picture className={classes["img"]}>
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
        <h3 className={classes["title"]}>{article.title}</h3>
        <p className={classes["content"]}>{article.content}</p>
      </article>
    );
  });
  return <>{elements}</>;
}
