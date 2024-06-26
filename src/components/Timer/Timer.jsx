import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const Timer = ({ seconds, onTimeExpired }) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    const savedTime = localStorage.getItem("quizTimer");
    const savedTimestamp = localStorage.getItem("quizTimerTimestamp");

    if (savedTime && savedTimestamp) {
      const currentTime = Date.now();
      const timePassed = Math.floor(
        (currentTime - parseInt(savedTimestamp)) / 1000,
      );
      const adjustedTime = Math.max(parseInt(savedTime) - timePassed, 0);

      setTime(adjustedTime);
      if (adjustedTime <= 0) {
        onTimeExpired();
      }
    } else {
      setTime(seconds);
    }
  }, [seconds, onTimeExpired]);

  useEffect(() => {
    if (time > 0) {
      localStorage.setItem("quizTimer", time);
      localStorage.setItem("quizTimerTimestamp", Date.now());

      const intervalId = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;

          if (newTime === 300) {
            toast("Hurry Up! Less than 5 minutes remaining!", {
              icon: "⏰",
            });
          }

          if (newTime <= 0) {
            clearInterval(intervalId);
            onTimeExpired();
            localStorage.removeItem("quizTimer");
            localStorage.removeItem("quizTimerTimestamp");
          }

          return newTime;
        });
      }, 1000);

      return () => {
        clearInterval(intervalId);
        if (time > 0) {
          localStorage.setItem("quizTimer", time);
          localStorage.setItem("quizTimerTimestamp", Date.now());
        }
      };
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
          time <= 300
            ? "text-red-500"
            : "text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
        }`}
      >
        Time Left: {formattedTime}
      </p>
      <Toaster />
    </div>
  );
};

export default Timer;
