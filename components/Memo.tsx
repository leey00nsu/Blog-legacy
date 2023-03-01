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
        {!props.isAdjusted && <LoadingSpinner size="lg" full />}
        <Page adjust={props.adjustHTML} isAdjusted={props.isAdjusted} />
      </article>
    </AppLayout>
  );
};

// Page를 통해 NotionPage가 렌더링되는데 , 최종적으로 해당 컴포넌트에서 html를 조회하여
// 모든 a태그를 div태그로 변경하고 onclick 이벤트로 교체합니다.
// Link from next/link와 같은 동작을 하도록 의도되었습니다.
export default function WrappedComponent(props: any) {
  const [isAdjusted, setIsAdjusted] = useState(false);
  const { children, ...rest } = props;
  const router = useRouter();

  // 경로 이동 시 페이지의 hidden 클래스를 추가하여 보이지 않게 합니다.
  const resetAdjust = () => {
    const adjustChecker = document.querySelector("#adjust_checker");
    if (adjustChecker) {
      adjustChecker.className = "hidden";
    }
    setIsAdjusted(false);
    sessionStorage.setItem("isLoaded", "false");
  };

  useEffect(() => {
    resetAdjust();
    return () => {
      resetAdjust();
    };
  }, [router]);

  // 기존 a태그의 동작을 막고 , 화면 새로고침 없이 렌더링되게 합니다.
  function pushPage(e: any) {
    e.preventDefault();
    let id;
    if (e.target.href) {
      id = e.target.href;
    } else {
      //가장 가까운 a 태그의 id에 페이지의 url이 담겨있습니다.
      const aTag = e.target.closest("a");
      if (aTag) {
        id = aTag.href;
      }
      // 페이지를 클릭하면 페이지 조정을 하기 전까지 가립니다.
    }
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
        aTag.onclick = pushPage;
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
