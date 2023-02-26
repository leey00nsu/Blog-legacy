import * as React from "react";

import { ExtendedRecordMap } from "notion-types";

import { NotionPage } from "../../components/NotionPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
const rootNotionPageId = "b3ceeaa8404d4f82ad5c2dae07ea6acd";

interface pageItems {
  pageId: string;
  pageTitle: string;
  recordMap: ExtendedRecordMap;
}

export default function Page() {
  const router = useRouter();
  const [page, setPage] = useState<pageItems>();
  useEffect(() => {
    const fetchData = async () => {
      if (router.query.pageId !== undefined) {
        const response = await fetch(
          `http://localhost:3000/api/memo/${router.query.pageId}`
        );

        const page = await response.json();
        setPage({
          pageId: page.pageId,
          pageTitle: page.pageTitle,
          recordMap: page.recordMap,
        });
      }
    };
    fetchData();
  }, [router.query.pageId]);

  if (!page) {
    return <LoadingSpinner size="lg" full />;
  }

  return (
    <NotionPage recordMap={page["recordMap"]} rootPageId={rootNotionPageId} />
  );
}
