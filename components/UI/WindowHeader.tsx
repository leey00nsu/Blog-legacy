import React, { useState } from "react";
import WindowHeaderButton from "./WindowHeaderButton";
import WindowHeaderTimer from "./WindowHeaderTimer";
import Image from "next/image";

const WindowHeader = () => {
  const headerButtonHandler = () => {};

  return (
    <header className="flex w-screen h-10 bg-gradient-to-r from-gray-500/30 to-gray-700/30 backdrop-blur-md shrink-0">
      <nav className="flex items-center justify-between w-full h-full px-5">
        <WindowHeaderButton onClick={headerButtonHandler}>
          <Image
            className="object-cover "
            src="/Apple_logo_white.svg"
            alt="apple logo"
            width={20}
            height={15}
          />
        </WindowHeaderButton>

        <section className="flex items-center justify-between h-full text-white grow">
          <div className="h-full">
            <WindowHeaderButton onClick={headerButtonHandler}>
              LEEYOONSU
            </WindowHeaderButton>
          </div>
          <div className="h-full">
            <WindowHeaderButton onClick={headerButtonHandler} box>
              GitHub
            </WindowHeaderButton>
          </div>
        </section>
        <WindowHeaderTimer />
      </nav>
    </header>
  );
};

export default WindowHeader;
