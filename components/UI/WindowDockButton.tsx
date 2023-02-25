interface WindowDockButtonProps {
  onClick: () => void;
  src: string;
}

// 윈도우의 하단 독에 들어가는 아이콘
// props로 src=이미지경로 를 입력받습니다.

const WindowDockButton = (props: WindowDockButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      style={{ backgroundImage: `url(${props.src})` }}
      className="bg-cover flex items-center justify-center w-12 h-12 mx-2 duration-300 ease-in-out bg-white rounded-lg drop-shadow-md hover:w-16 hover:h-16"
    ></button>
  );
};

export default WindowDockButton;
