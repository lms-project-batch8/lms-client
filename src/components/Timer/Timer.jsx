import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const Timer = ({ seconds, onTimeExpired }) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    setTime(seconds);
  }, [seconds]);

  useEffect(() => {
    if (time > 0) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 5) {
            toast("Less than 5 seconds remaining!", {
              icon: "⏰",
            });
          }
          if (prevTime === 1) {
            onTimeExpired();
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [time, onTimeExpired]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const secondsLeft = time % 60;

  const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;

  return (
    <div>
      <p
        className={`font-bold text-xl ${
          time > 5
            ? "text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            : "text-red-500"
        }`}
      >
        Time Left: {formattedTime}
      </p>
      <Toaster />
    </div>
  );
};

export default Timer;
