import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { type TimeProps } from "../types/time";

const SAVED_TIMES_KEY = "savedTimes";
const MAX_SAVED_TIMES = 10;
const EMPTY_TIME = "00:00:00";

const readSavedTimes = (): TimeProps[] => {
  const savedTimes = localStorage.getItem(SAVED_TIMES_KEY);

  if (!savedTimes) {
    return [];
  }

  try {
    const parsedSavedTimes = JSON.parse(savedTimes);
    return Array.isArray(parsedSavedTimes) ? parsedSavedTimes : [];
  } catch {
    return [];
  }
};

export const useSavedTimes = (currentTime: string) => {
  const [saved, setSaved] = useState<TimeProps[]>(readSavedTimes);

  useEffect(() => {
    localStorage.setItem(SAVED_TIMES_KEY, JSON.stringify(saved));
  }, [saved]);

  const saveTime = useCallback(() => {
    if (currentTime === EMPTY_TIME) {
      return;
    }

    setSaved((currentSavedTimes) => {
      if (currentSavedTimes.some((item) => item.time === currentTime)) {
        return currentSavedTimes;
      }

      return [
        ...currentSavedTimes,
        {
          id: uuidv4(),
          time: currentTime,
        },
      ].slice(-MAX_SAVED_TIMES);
    });
  }, [currentTime]);

  const deleteTime = useCallback((id: string) => {
    setSaved((currentSavedTimes) =>
      currentSavedTimes.filter((item) => item.id !== id),
    );
  }, []);

  return {
    saved,
    saveTime,
    deleteTime,
  };
};
