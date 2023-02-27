import * as React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const NotionPage = ({
  pageTitle,
  recordMap,
  rootPageId,
  pageInfo,
}: {
  pageTitle: string;
  recordMap: ExtendedRecordMap;
  rootPageId?: string;
  pageInfo: { [key: string]: string };
}) => {
  if (!recordMap) {
    return null;
  }

  const Code = dynamic(() =>
    import("react-notion-x/build/third-party/code").then((m) => m.Code)
  );
  const Collection = dynamic(() =>
    import("react-notion-x/build/third-party/collection").then(
      (m) => m.Collection
    )
  );
  const Equation = dynamic(() =>
    import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
  );
  const Pdf = dynamic(
    () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
    {
      ssr: false,
    }
  );
  const Modal = dynamic(
    () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
    {
      ssr: false,
    }
  );

  const mapPageUrl = (id: string) => {
    return `/memo/${pageInfo[id]}`;
  };

  return (
    <>
      <Head>
        <meta name="description" content="LEEYOONSU BLOG" />

        <title>{pageTitle}</title>
      </Head>

      <NotionRenderer
        isShowingSearch={true}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootPageId={rootPageId}
        mapPageUrl={mapPageUrl}
      />
    </>
  );
};
