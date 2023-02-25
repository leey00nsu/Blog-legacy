import WindowHeader from "../components/UI/WindowHeader";
import WindowDock from "../components/UI/WindowDock";

const HomePage = () => {
  return (
    <div className="w-screen h-screen bg-cover wallpaper ">
      <WindowHeader />
      <WindowDock />
    </div>
  );
};

export default HomePage;
