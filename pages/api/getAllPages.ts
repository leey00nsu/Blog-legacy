import notion from "../../lib/notion";
import { NextApiRequest, NextApiResponse } from "next";
import { getAllPagesInSpace } from "notion-utils";
const rootNotionPageId: string = "b3ceeaa8404d4f82ad5c2dae07ea6acd";

interface pageInfo {
  [key: string]: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 전체 페이지를 순회하여 링크를 모아 객체로 만듭니다.
  const traversePage = async () => {
    let pageInfo: pageInfo = {};
    let queue: string[] = [rootNotionPageId];
    while (queue.length > 0) {
      const searchPageId: string = queue.shift()!;
      if (searchPageId === undefined) continue;
      let recordMap = await notion.getPage(searchPageId);

      Object.keys(recordMap.block).forEach((blockId) => {
        const blockValue = recordMap.block[blockId].value;
        if (blockValue.type === "page" && blockValue?.properties?.title) {
          const title = blockValue.properties.title[0][0];
          if (!pageInfo[blockValue.id]) {
            queue.push(blockValue.id);
            pageInfo[blockValue.id] = title;
            console.log(searchPageId, title);
          }
        }
      });
    }

    console.log("done!");

    return pageInfo;
  };

  const pageInfo = await traversePage();

  res.status(200).json({ pageInfo });
}
