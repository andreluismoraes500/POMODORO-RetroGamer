import { useEffect, useState } from "react";
import useSound from "use-sound";
import audio from "../audio/Keep It Going.mp3";

type TimerControl = {
  timer: string;
  isActive: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  stop: () => void;
};

export const usePomodoro = (initialTime: number): TimerControl => {
  const [timer, setTimer] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [play, { stop }] = useSound<string>(audio);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer: number) => prevTimer - 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }

    if (timer == 0) {
      play();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timer]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  };

  return {
    timer: formatTime(timer),
    isActive,
    start: () => setIsActive(true),
    pause: () => setIsActive(false),
    reset: () => {
      setIsActive(false);
      setTimer(initialTime);
    },
    stop,
  };
};
