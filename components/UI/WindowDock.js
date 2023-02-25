import WindowDockButton from "./WindowDockButton";

const WindowDock = () => {
  return (
    <section className="absolute flex items-center justify-center w-screen h-20 bottom-3">
      <div className="flex items-center justify-between px-2 py-3 border border-gray-200/30 rounded-2xl w-fit bg-gray-300/30 backdrop-blur-md">
        <WindowDockButton>a</WindowDockButton>
        <WindowDockButton>b</WindowDockButton>
        <WindowDockButton>c</WindowDockButton>
      </div>
    </section>
  );
};

export default WindowDock;
