import Timer from "./Components/Timer";
import Buttons from "./Components/Buttons";
import ListTimes from "./Components/ListTimes";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

export type TimeProps = {
  id: string;
  time: string;
}

function App() {
  const [timer, setTimer] = useState<string>("00:00:00");
  const [buttonName, setButtonName] = useState<string>("Start");
  const [saved, setSaved] = useState<TimeProps[]>(localStorage.getItem('savedTimes') ? JSON.parse(localStorage.getItem('savedTimes') as string) : []);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef<number>(0); // <- persistent counter

  const formatTime = (totalSec: number) => {
    const h: number = Math.floor(totalSec / 3600);
    const m: number = Math.floor((totalSec % 3600) / 60);
    const s: number = totalSec % 60;
    return `${h <= 9 ? `0${h}` : h}:${m <= 9 ? `0${m}` : m}:${s <= 9 ? `0${s}` : s}`;
  };

  const startTimer = () => {
    if (intervalId.current) return;
    setButtonName('Start');
    intervalId.current = setInterval(() => {
      elapsedRef.current += 1;
      setTimer(formatTime(elapsedRef.current));
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    timer !== '00:00:00' && setButtonName('Resume');
  };

  useEffect(() => {
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (saved.length > 10) {
      const trimmed = saved.slice(-10);
      setSaved(trimmed);
      localStorage.setItem('savedTimes', JSON.stringify(trimmed));
      return;
    }

    localStorage.setItem('savedTimes', JSON.stringify(saved));
  }, [saved]);

  const resetTimer = () => {
    elapsedRef.current = 0;
    setTimer('00:00:00');
    stopTimer();
    setButtonName('Start');
  };

  const saveTime: () => void = () => {
    if (timer === '00:00:00' || saved.some((item) => item.time === timer)) {
      return;
    }

    const newTime: TimeProps = {
      id: uuidv4(),
      time: timer
    };

    setSaved([...saved, newTime]);
  }

  const deleteTime = (id: string) => {
    setSaved(saved.filter(item => item.id !== id));
  }

  return (
    <div className="container">
      <Timer timer={timer} />
      <Buttons startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} saveTime={saveTime} buttonName={buttonName} />
      <ListTimes saved={saved} deleteTime={deleteTime} />
    </div>
  );
}

export default App;