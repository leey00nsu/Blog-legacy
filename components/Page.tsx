import * as React from "react";

import { ExtendedRecordMap } from "notion-types";

import { NotionPage } from "../components/NotionPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/UI/LoadingSpinner";

interface pageItems {
  pageId: string;
  pageTitle: string;
  recordMap: ExtendedRecordMap;
  pageInfo: { [key: string]: string };
}

interface PageProps {
  adjust: () => void;
  isAdjusted: boolean;
}

// NotionPage를 렌더링하기 위한 경유 컴포넌트입니다.
// 세션스토리지에 저장되어있는 노션링크를 확인하여 해당 한글경로로 api를 요청하여
// 해당 노션페이지를 받아옵니다.
export default function Page(props: PageProps) {
  const router = useRouter();
  const [page, setPage] = useState<pageItems>();
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const slug = router.query.slug as string[];

      if (!slug || slug[1] === "undefined") {
        return;
      }
      const pageInfo = JSON.parse(sessionStorage.getItem("pageInfo")!);

      // 세션 스토리지에 페이지 내용이 없다면 리턴
      if (!pageInfo) {
        setTimeout(fetchData, 100);
        return;
      }

      // 현재 url의 값으로 해당 값과 일치하는 pageId를 찾습니다.
      const pageId = Object.keys(pageInfo.pageInfo).find(
        (key) => pageInfo.pageInfo[key] === slug[1]
      );
      const pageTitle = slug[1];

      // 세션 스토리지에 해당 페이지가 없다면 404 에러 리턴
      if (!pageId) {
        setIs404(true);
        return;
      }

      const response = await fetch(`/api/memo/${slug[1]}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageId: pageId,
        }),
      });

      const page: { recordMap: ExtendedRecordMap } = await response.json();
      setPage({
        pageId: pageId!,
        pageTitle: pageTitle.toString(),
        recordMap: page.recordMap,
        pageInfo: pageInfo.pageInfo,
      });
      sessionStorage.setItem("isLoaded", "pending");
    };
    if (props.isAdjusted === false) {
      fetchData();
    }
  }, [props.isAdjusted]);

  if (page && !is404) {
    return (
      <NotionPage
        adjust={props.adjust}
        recordMap={page["recordMap"]}
        pageTitle={page["pageTitle"]}
        rootPageId={page["pageId"]}
        pageInfo={page["pageInfo"]}
      />
    );
  }

  //Todo: 404 페이지
  return <></>;
}
