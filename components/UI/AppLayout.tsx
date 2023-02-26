import React from "react";
import { FiMinus, FiX, FiMaximize2 } from "react-icons/fi";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  return (
    <section className="flex items-center justify-center py-6 grow overflow-y-auto drop-shadow-2xl">
      <div className="flex flex-col w-11/12 h-full bg-white rounded-2xl  ">
        <nav className="flex items-center w-full h-12 px-6 border-b border-gray-200 drop-shadow-sm shrink-0">
          <section className="flex group">
            <div className="flex items-center justify-center w-4 h-4 mx-1 bg-red-500 rounded-full drop-shadow-sm">
              <FiX
                className="opacity-0 group-hover:opacity-100"
                size="0.7rem"
              />
            </div>
            <div className="flex items-center justify-center w-4 h-4 mx-1 bg-yellow-500 rounded-full drop-shadow-sm">
              <FiMinus
                className="opacity-0 group-hover:opacity-100"
                size="0.7rem"
              />
            </div>
            <div className="flex items-center justify-center w-4 h-4 mx-1 bg-green-500 rounded-full drop-shadow-sm">
              <FiMaximize2
                className="opacity-0 group-hover:opacity-100"
                size="0.7rem"
              />
            </div>
          </section>
        </nav>
        {props.children}
      </div>
    </section>
  );
};

export default AppLayout;
