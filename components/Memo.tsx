import React from "react";
import AppLayout from "./UI/AppLayout";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import LoadingSpinner from "./UI/LoadingSpinner";
import Page from "./Page";

import { useRouter } from "next/router";

const Memo = () => {
  return (
    <AppLayout>
      <article
        id="content"
        className="flex flex-col items-center w-full my-4 overflow-y-auto"
      >
        <Page />
      </article>
    </AppLayout>
  );
};

export default Memo;
