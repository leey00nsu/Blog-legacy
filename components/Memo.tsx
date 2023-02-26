import React from "react";
import AppLayout from "./UI/AppLayout";
import { FiMinus, FiX, FiMaximize2 } from "react-icons/fi";

const Memo = () => {
  return (
    <AppLayout>
      <article className="flex flex-col items-center w-full my-4 overflow-y-auto">
        <header className="text-2xl font-bold">
          여기엔 게시글의 제목이 들어갑니다.
        </header>
        <article>aa</article>
        <article>aa</article>
        <article>aa</article>
        <article>aa</article>
        <article>aa</article>
        <article>aa</article>
        <article>aa</article>
        <article>aa</article>
      </article>
    </AppLayout>
  );
};

export default Memo;
