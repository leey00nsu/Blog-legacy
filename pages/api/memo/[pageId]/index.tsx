import notion from "../../../../lib/notion";
import { NextApiRequest, NextApiResponse } from "next";
const rootNotionPageId = "b3ceeaa8404d4f82ad5c2dae07ea6acd";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);

  const recordMap = await notion.getPage(rootNotionPageId);
  let pageTitle = "";
  let pageId = "";

  Object.keys(recordMap.block).forEach((blockId) => {
    const blockValue = recordMap.block[blockId].value;
    if (blockValue.type === "page" && blockValue?.properties?.title) {
      const title = blockValue.properties.title[0][0];
      if (title === "코딩테스트") {
        pageTitle = title;
        pageId = blockValue.id;
        // console.log(pageTitle, pageId);
      }
    }
  });

  res.status(200).json({ pageTitle, pageId, recordMap });
}
