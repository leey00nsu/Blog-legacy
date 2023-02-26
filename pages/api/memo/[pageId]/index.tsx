import notion from "../../../../lib/notion";
import { NextApiRequest, NextApiResponse } from "next";
import { getAllPagesInSpace } from "notion-utils";
const rootNotionPageId: string = "b3ceeaa8404d4f82ad5c2dae07ea6acd";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let pageId = req.body.pageId;
  let recordMap = await notion.getPage(pageId);

  res.status(200).json({ recordMap });
}
