import * as React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";
import { NotionRenderer } from "react-notion-x";
import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";
import { Equation } from "react-notion-x/build/third-party/equation";
import { Modal } from "react-notion-x/build/third-party/modal";
import { Pdf } from "react-notion-x/build/third-party/pdf";

export const NotionPage = ({
  recordMap,
  rootPageId,
}: {
  recordMap: ExtendedRecordMap;
  rootPageId?: string;
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

  const title = getPageTitle(recordMap);

  const mapPageUrl = (title: string) => {
    return "/memo/" + title;
  };

  return (
    <>
      <Head>
        <meta name="description" content="LEEYOONSU BLOG" />

        <title>{title}</title>
      </Head>

      <NotionRenderer
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
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
