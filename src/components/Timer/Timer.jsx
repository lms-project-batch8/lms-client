import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

const Timer = ({ seconds }) => {
    const [time, setTime] = useState(seconds);

    useEffect(() => {
        if (time === 0) return;

        const intervalId = setInterval(() => {
            setTime((time) => time - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time]);

    useEffect(() => {
        if (time > 0) {
            const intervalId = setInterval(() => {
                if (time < 5) {
                    console.log("5");
                }
            }, 1000);

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [time]);

    const minutes = Math.floor(time / 60);
    const secondsLeft = time % 60;

    const formattedTime = `${minutes}:${
        secondsLeft < 10 ? "0" : ""
    }${secondsLeft}`;
    return (
        <div className={minutes > 4 ? "test-black" : "text-red-500"}>
            <p className="font-bold text-xl">Time Left : {formattedTime} </p>
            <Toaster />
        </div>
    );
};

export default Timer;
