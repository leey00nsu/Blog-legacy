import WindowHeader from "../components/UI/WindowHeader";
import WindowDock from "../components/UI/WindowDock";
import Apps from "../components/Apps";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// [...slug] 를 이용해 모든 url에 대해 입력받고 렌더링합니다.
// 이때 세션스토리지에 pageInfo 객체를 확인하는데 , pageInfo에는 "노션링크":"한글경로"가 할당되어 있습니다.
const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof sessionStorage === "undefined") {
      return;
    }
    // 세션 스토리지에 페이지 정보가 있는지 확인합니다.
    const item = sessionStorage.getItem("pageInfo");

    const fetchData = async () => {
      if (item) {
        return;
      }
      if (!item) {
        const response = await fetch(`/api/getAllPages`);

        const pageInfo = await response.json();

        // 가져온 페이지 정보를 세션 스토리지에 담습니다.
        sessionStorage.setItem("pageInfo", JSON.stringify(pageInfo));
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Head>
        <meta name="description" content="LEEYOONSU BLOG" />
        <link rel="icon" href="/favicon.ico" />
        <title>LEEYOONSU BLOG</title>
      </Head>
      <div className="flex flex-col w-screen h-screen bg-cover wallpaper max-h-screen">
        <WindowHeader />
        <Apps />
        <WindowDock />
      </div>
    </>
  );
};

export default HomePage;
