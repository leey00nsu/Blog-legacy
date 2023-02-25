const WindowHeaderButton = (props) => {
  const buttonStyle = props.box
    ? "px-2 text-base text-black bg-white rounded-md drop-shadow-md"
    : "px-2 text-base text-white drop-shadow-md";
  return (
    <button
      onClick={props.onClick}
      className="flex items-center h-full px-2 mx-1 hover:bg-gray-400/50 hover:rounded-md"
    >
      <div className={buttonStyle}>{props.children}</div>
    </button>
  );
};

WindowHeaderButton.defaultProps = {
  box: false,
};

export default WindowHeaderButton;
