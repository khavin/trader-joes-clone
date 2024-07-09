import { SectionHeader } from "./section_header";
import { PaginatedArticles } from "./paginated_articles";
import WhatsNewImageURL from "./assets/whats_new.webp";
const title = "What's New?";

export function WhatsNew({ articles }) {
  return (
    <>
      <SectionHeader title={title} imageLink={WhatsNewImageURL} />
      <PaginatedArticles articles={articles}></PaginatedArticles>
    </>
  );
}
