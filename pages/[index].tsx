import WindowHeader from "../components/UI/WindowHeader";
import WindowDock from "../components/UI/WindowDock";
import Apps from "../components/Apps";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    if (typeof sessionStorage === "undefined") {
      return;
    }
    // Perform localStorage action
    const item = sessionStorage.getItem("pageInfo");

    const fetchData = async () => {
      if (isFetched) {
        return;
      }
      if (!item) {
        console.log("in");
        setIsFetched(true);
        // console.log("fetching!");
        const response = await fetch(`/api/getAllPages`);

        const pageInfo = await response.json();
        sessionStorage.setItem("pageInfo", JSON.stringify(pageInfo));
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col w-screen h-screen bg-cover wallpaper max-h-screen">
      <WindowHeader />
      <Apps />
      <WindowDock />
    </div>
  );
};

export default HomePage;
