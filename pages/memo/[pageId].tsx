import * as React from "react";

import { ExtendedRecordMap } from "notion-types";

import { NotionPage } from "../../components/NotionPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

interface pageItems {
  pageId: string;
  pageTitle: string;
  recordMap: ExtendedRecordMap;
  pageInfo: { [key: string]: string };
}

export default function Page() {
  const router = useRouter();
  const [page, setPage] = useState<pageItems>();
  useEffect(() => {
    const fetchData = async () => {
      if (router.query.pageId === undefined) {
        return;
      }
      const queryId = router.query.pageId;
      const pageInfo = JSON.parse(sessionStorage.getItem("pageInfo")!);
      if (!pageInfo) return;
      console.log(pageInfo.pageInfo);
      console.log(queryId);

      // 현재 url의 값으로 해당 값과 일치하는 pageId를 찾습니다.
      const pageId = Object.keys(pageInfo.pageInfo).find(
        (key) => pageInfo.pageInfo[key] === router.query.pageId
      );
      const pageTitle = router.query.pageId;

      console.log(pageId);

      const response = await fetch(`/api/memo/${router.query.pageId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageId: pageId,
        }),
      });

      const page = await response.json();
      setPage({
        pageId: pageId!,
        pageTitle: pageTitle.toString(),
        recordMap: page.recordMap,
        pageInfo: pageInfo.pageInfo,
      });
      console.log(page.recordMap);
    };
    fetchData();
  }, [router]);

  if (!page) {
    return <LoadingSpinner size="lg" full />;
  }

  //  console.log(page);

  return (
    <NotionPage
      recordMap={page["recordMap"]}
      pageTitle={page["pageTitle"]}
      rootPageId={page["pageId"]}
      pageInfo={page["pageInfo"]}
    />
  );
}
