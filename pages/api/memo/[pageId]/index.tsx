import notion from "../../../../lib/notion";
import { NextApiRequest, NextApiResponse } from "next";
import { ExtendedRecordMap } from "notion-types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const pageId = req.body.pageId;
  const recordMap: ExtendedRecordMap = await notion.getPage(pageId);

  res.status(200).json({ recordMap });
}
