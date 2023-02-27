import WindowHeader from "../components/UI/WindowHeader";
import WindowDock from "../components/UI/WindowDock";
import Apps from "../components/Apps";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
  }, [router]);
  return (
    <div className="flex flex-col w-screen h-screen bg-cover wallpaper max-h-screen">
      <WindowHeader />
      <Apps />
      <WindowDock />
    </div>
  );
};

export default HomePage;
