import WindowHeader from "../components/UI/WindowHeader";
import WindowDock from "../components/UI/WindowDock";
import Apps from "../components/Apps";
import { useState } from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-cover wallpaper ">
      <WindowHeader />
      <Apps />
      <WindowDock />
    </div>
  );
};

export default HomePage;
