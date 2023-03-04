// @ts-nocheck : prismjs의 타입 체크에 문제가 있어 타입 지정이 되지 않음
// todo : 타입 체크 고쳐지면 지우기
import * as React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "../lib/react-notion-x/src";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { searchNotion } from "../lib/search-notion";
import LoadingSpinner from "./UI/LoadingSpinner";

interface pageItems {
  pageId: string;
  pageTitle: string;
  recordMap: ExtendedRecordMap;
  pageInfo: { [key: string]: string };
}

export const NotionPage = (props: { page: pageItems | null }) => {
  useEffect(() => {
    if (props.page) {
      console.log("notionPage를 렌더링합니다.");
      const contentElement = document.getElementById("content");
      contentElement?.scrollTo(0, 0);
    }
  }, [props.page]);

  if (!props.page) {
    return <LoadingSpinner size="lg" full />;
  }
  const { pageId, pageTitle, recordMap, pageInfo } = props.page;

  // prismjs : 코드 블럭 하이라이팅
  const Code = dynamic(() =>
    import("react-notion-x/build/third-party/code").then(async (m) => {
      await Promise.all([
        import("prismjs/components/prism-markup-templating.js"),
        import("prismjs/components/prism-markup.js"),
        import("prismjs/components/prism-bash.js"),
        import("prismjs/components/prism-c.js"),
        import("prismjs/components/prism-cpp.js"),
        import("prismjs/components/prism-csharp.js"),
        import("prismjs/components/prism-docker.js"),
        import("prismjs/components/prism-java.js"),
        import("prismjs/components/prism-js-templates.js"),
        import("prismjs/components/prism-coffeescript.js"),
        import("prismjs/components/prism-diff.js"),
        import("prismjs/components/prism-git.js"),
        import("prismjs/components/prism-go.js"),
        import("prismjs/components/prism-graphql.js"),
        import("prismjs/components/prism-handlebars.js"),
        import("prismjs/components/prism-less.js"),
        import("prismjs/components/prism-makefile.js"),
        import("prismjs/components/prism-markdown.js"),
        import("prismjs/components/prism-objectivec.js"),
        import("prismjs/components/prism-ocaml.js"),
        import("prismjs/components/prism-python.js"),
        import("prismjs/components/prism-reason.js"),
        import("prismjs/components/prism-rust.js"),
        import("prismjs/components/prism-sass.js"),
        import("prismjs/components/prism-scss.js"),
        import("prismjs/components/prism-solidity.js"),
        import("prismjs/components/prism-sql.js"),
        import("prismjs/components/prism-stylus.js"),
        import("prismjs/components/prism-swift.js"),
        import("prismjs/components/prism-wasm.js"),
        import("prismjs/components/prism-yaml.js"),
      ]);
      return m.Code;
    })
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
        searchNotion={searchNotion}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        showTableOfContents={true}
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootPageId={pageId}
        mapPageUrl={mapPageUrl}
      />
    </>
  );
};
