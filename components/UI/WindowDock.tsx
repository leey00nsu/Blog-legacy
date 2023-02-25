import WindowDockButton from "./WindowDockButton";

// 윈도우의 하단 독
const WindowDock = () => {
  const dockButtonHandler = () => {};
  return (
    <section className="absolute flex items-center justify-center w-screen h-20 bottom-3">
      <div className="flex items-center justify-between px-2 py-3 border border-gray-200/30 rounded-2xl w-fit bg-gray-300/30 backdrop-blur-md">
        <WindowDockButton onClick={dockButtonHandler} src="/icon_memo.png" />
      </div>
    </section>
  );
};

export default WindowDock;
