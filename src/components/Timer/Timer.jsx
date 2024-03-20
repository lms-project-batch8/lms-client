import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const Timer = ({ seconds }) => {
  const [time, setTime] = useState(seconds);

  // Reset the timer if the `seconds` prop changes
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
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [time]);

  const minutes = Math.floor(time / 60);
  const secondsLeft = time % 60;
  const formattedTime = `${minutes}:${
    secondsLeft < 10 ? "0" : ""
  }${secondsLeft}`;

  return (
    <div className={minutes > 0 ? "text-black" : "text-red-500"}>
      <p className='font-bold text-xl'>Time Left: {formattedTime}</p>
      <Toaster />
    </div>
  );
};

export default Timer;
