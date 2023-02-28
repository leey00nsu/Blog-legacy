import React from "react";
import AppLayout from "./UI/AppLayout";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import LoadingSpinner from "./UI/LoadingSpinner";

import { useRouter } from "next/router";

const Page = dynamic(() => import("./Page"));

const Memo = (props: any) => {
  return (
    <AppLayout>
      <article
        id="content"
        className="flex flex-col items-center w-full my-4 overflow-y-auto"
      >
        {!props.isAdjusted &&<LoadingSpinner size="lg" full />}
        <Page adjust={props.adjustHTML} isAdjusted={props.isAdjusted} />
      </article>
    </AppLayout>
  );
};

export default function WrappedComponent(props: any) {
  const [isAdjusted, setIsAdjusted] = useState(false);
  const { children, ...rest } = props;
  const router = useRouter();

  useEffect(() => {
    setIsAdjusted(false);
    sessionStorage.setItem("isLoaded", "false");
  }, [router]);

  function pushPage(e: any) {
    let id;
    if (e.target.id) {
      id = e.target.id;
    } else {
      //가장 가까운 div의 id에 페이지의 url이 담겨있습니다.
      const div = e.target.closest("div");
      if (div) {
        id = div.id;
      }
    }
    // 페이지를 클릭하면 페이지 조정을 하기 전까지 가립니다.
    const adjustChecker = document.querySelector("#adjust_checker")!;
    adjustChecker.className = "hidden";

    router.push(id);
  }

  const adjustHTMLHandler = () => {
    if (typeof sessionStorage === "undefined") {
      return;
    }
    const isLoaded = sessionStorage.getItem("isLoaded");

    if (document.readyState === "complete" && isLoaded === "pending") {
      if (isAdjusted) return;
      const aTags = document.querySelectorAll("a");

      // 노션 게시글 html 트리에 직접 접근하여 a 태그를 모두 div태그로 바꾼 후
      // a 태그의 href 경로를 onclick 이벤트로 바꾸어 페이지 새로고침이 일어나지 않게 함
      // Todo: react-notion-x 라이브러리가 개선되면 수정하기
      for (let i = 0; i < aTags.length; i++) {
        const aTag = aTags[i];
        const href = aTag.getAttribute("href");
        const div = document.createElement("div");
        div.className = aTag.className+" hover:cursor-pointer";
        div.onclick = pushPage;
        div.id = href!;
        while (aTag.firstChild) {
          div.appendChild(aTag.firstChild);
        }
        aTag.parentNode?.insertBefore(div, aTag);
        aTag.remove();
      }

      const contentElement = document.getElementById("content");
      contentElement?.scrollTo(0, 0);
      sessionStorage.setItem("isLoaded", "true");
      setIsAdjusted(true);

      // 페이지가 조정된 후 hidden 클래스를 제거하여 보이게 합니다.
      const adjustChecker = document.querySelector("#adjust_checker")!;
      adjustChecker.className = "";
    }
  };

  return (
    <>
      <Memo {...rest} adjustHTML={adjustHTMLHandler} isAdjusted={isAdjusted}>
        {React.Children.map(children, (child) => {
          return child;
        })}
      </Memo>
    </>
  );
}
