import { NotionAPI } from "notion-client";
import { SearchParams, SearchResults } from "notion-types";

const notion = new NotionAPI();

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params);
}

export default notion;
