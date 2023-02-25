const WindowDockButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center justify-center w-12 h-12 mx-2 duration-300 ease-in-out bg-white rounded-lg drop-shadow-md hover:w-16 hover:h-16"
    >
      {props.children}
    </button>
  );
};

export default WindowDockButton;
