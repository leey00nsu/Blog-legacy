import React from "react";
import AppLayout from "./UI/AppLayout";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

const Page = dynamic(() => import("./Page"));

interface NextLinkProps {
  href: string;
  children: React.ReactNode;
}

function NextLink(props: NextLinkProps) {
  return (
    <Link href={props.href} as={props.href}>
      <span>{props.children}</span>
    </Link>
  );
}

const Memo = React.memo((props: any) => {
  return (
    <AppLayout>
      <article
        id="content"
        className="flex flex-col items-center w-full my-4 overflow-y-auto"
      >
        <Page adjust={props.adjustHTML} isAdjusted={props.isAdjusted} />
      </article>
    </AppLayout>
  );
});

export default function WrappedComponent(props: any) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdjusted, setIsAdjusted] = useState(false);
  const { children, ...rest } = props;
  const router = useRouter();

  useEffect(() => {
    setIsAdjusted(false);
  }, [router]);

  function pushPage(e) {
    let id;
    if (e.target.id) {
      id = e.target.id;
    } else {
      const div = e.target.closest("div");
      if (div) {
        id = div.id;
      }
    }
    // console.log(id);
    router.push(id);
  }

  const adjustHTMLHandler = () => {
    // Wait for all HTML elements to be hydrated

    if (typeof sessionStorage === "undefined") {
      return;
    }
    const isLoaded = sessionStorage.getItem("isLoaded");

    if (document.readyState === "complete" && isLoaded === "true") {
      sessionStorage.setItem("isLoaded", "pending");
      console.log("in!");

      const aTags = document.querySelectorAll("a");
      for (let i = 0; i < aTags.length; i++) {
        const aTag = aTags[i];
        const href = aTag.getAttribute("href");
        const div = document.createElement("div");
        div.className = aTag.className;
        div.onclick = pushPage;
        div.id = href;
        while (aTag.firstChild) {
          div.appendChild(aTag.firstChild);
        }
        aTag.parentNode.insertBefore(div, aTag);
        aTag.remove();
      }

      const contentElement = document.getElementById("content");
      contentElement?.scrollTo(0, 0);
      sessionStorage.setItem("isLoaded", "true");
      setIsAdjusted(true);
    }
  };

  return (
    <Memo {...rest} adjustHTML={adjustHTMLHandler} isAdjusted={isAdjusted}>
      {React.Children.map(children, (child) => {
        return child;
      })}
    </Memo>
  );
}
