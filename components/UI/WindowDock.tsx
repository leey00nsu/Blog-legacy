import WindowDockButton from "./WindowDockButton";
import { useRouter } from "next/router";

// 윈도우의 하단 독
const WindowDock = () => {
  const router = useRouter();
  const dockButtonHandler = () => {
    if (router.query.index !== "memo") {
      router.replace("/memo");
    } else {
      router.replace("/");
    }
  };
  return (
    <section className="flex items-center justify-center w-screen h-20 bottom-3 my-2 shrink-0">
      <div className="flex items-center justify-between px-2 py-3 border border-gray-200/30 rounded-2xl w-fit bg-gray-300/30 backdrop-blur-md">
        <WindowDockButton onClick={dockButtonHandler} src="/icon_memo.png" />
      </div>
    </section>
  );
};

export default WindowDock;
