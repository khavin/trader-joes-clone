import { SectionHeader } from "./section_header";
import { PaginatedArticles } from "./paginated_articles";
const title = "What's New?";
const imageLink = "./whats_new.webp";

export function WhatsNew({ articles }) {
  return (
    <>
      <SectionHeader title={title} imageLink={imageLink} />
      <PaginatedArticles articles={articles}></PaginatedArticles>
    </>
  );
}
