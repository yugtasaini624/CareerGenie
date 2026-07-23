import { useEffect, useState } from "react";
import "./Quiz.css";

export default function Timer({ onTimeUp }) {

  const [seconds, setSeconds] = useState(600);

  useEffect(() => {

    if (seconds <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {

      setSeconds((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

  }, [seconds, onTimeUp]);

  const minutes = Math.floor(seconds / 60);

  const remaining = seconds % 60;

  return (

    <div className="timer">

      ⏱ {minutes}:{remaining < 10 ? `0${remaining}` : remaining}

    </div>

  );

}