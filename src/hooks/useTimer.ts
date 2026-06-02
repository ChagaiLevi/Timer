import { useCallback, useEffect, useRef, useState } from "react";
import { formatTime } from "../utils/formatTime";

export type TimerButtonName = "Start" | "Resume";

export const useTimer = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [buttonName, setButtonName] = useState<TimerButtonName>("Start");
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimerInterval = useCallback(() => {
    if (!intervalId.current) {
      return;
    }

    clearInterval(intervalId.current);
    intervalId.current = null;
  }, []);

  const startTimer = useCallback(() => {
    if (intervalId.current) {
      return;
    }

    setButtonName("Start");
    intervalId.current = setInterval(() => {
      setElapsedSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    clearTimerInterval();

    if (elapsedSeconds > 0) {
      setButtonName("Resume");
    }
  }, [clearTimerInterval, elapsedSeconds]);

  const resetTimer = useCallback(() => {
    clearTimerInterval();
    setElapsedSeconds(0);
    setButtonName("Start");
  }, [clearTimerInterval]);

  useEffect(() => {
    return clearTimerInterval;
  }, [clearTimerInterval]);

  return {
    timer: formatTime(elapsedSeconds),
    buttonName,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
