import React from "react";
import AppLayout from "./UI/AppLayout";
import Page from "./Page";

const Memo = () => {
  return (
    <AppLayout>
      <article className="flex flex-col items-center w-full my-4 overflow-y-auto">
        <Page />
      </article>
    </AppLayout>
  );
};

export default Memo;
