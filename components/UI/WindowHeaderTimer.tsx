import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

const WindowHeaderTimer = () => {
  const getCurrentTime = () => {
    const currentTime = new Intl.DateTimeFormat("ko", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date());

    return currentTime;
  };

  useEffect(() => {
    tick();
    const timeId = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  const tick = () => {
    setTime(() => getCurrentTime());
  };

  const [time, setTime] = useState("");

  // hydrate dismatch 방지를 위해 로딩 스피너 추가
  if (time === "") {
    return <LoadingSpinner />;
  }

  return <div className="text-white whitespace-nowrap">{time}</div>;
};

export default WindowHeaderTimer;
