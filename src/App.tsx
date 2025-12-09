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
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [buttonName, setButtonName] = useState<string>("Start");
  let isReset: boolean = false;
  const [saved, setSaved] = useState<TimeProps[]>(localStorage.getItem('savedTimes') ? JSON.parse(localStorage.getItem('savedTimes') as string) : []);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateTimer: () => void = () => {
    setSeconds((prevSeconds) => {
      let newSeconds = prevSeconds + 1;
      let newMinutes = minutes;
      let newHours = hours;

      if (newSeconds >= 60) {
        newSeconds = 0;
        newMinutes += 1;
      }

      if (newMinutes >= 60) {
        newMinutes = 0;
        newHours += 1;
      }

      if (newHours >= 24) {
        newHours = 0;
      }

      setMinutes(newMinutes);
      setHours(newHours);

      setTimer(
        `${newHours <= 9 ? `0${newHours}` : newHours}:${newMinutes <= 9 ? `0${newMinutes}` : newMinutes
        }:${newSeconds <= 9 ? `0${newSeconds}` : newSeconds}`
      );

      return newSeconds;
    });
  };

  const startTimer = () => {
    if (intervalId.current) return;

    updateTimer();
    buttonName === "Resume" && setButtonName("Start");

    intervalId.current = setInterval(() => {
      updateTimer();
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    isReset ? setButtonName("Start") : setButtonName("Resume");
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
      setSaved(saved.slice(0, 10));
      localStorage.setItem('savedTimes', JSON.stringify(saved.slice(0, 10)));
      return;
    }

    localStorage.setItem('savedTimes', JSON.stringify(saved));
  }, [saved]);

  const resetTimer: () => void = () => {
    isReset = true;
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setTimer("00:00:00");
    stopTimer();
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

  // I don't need to use seconds here, as the timer is already formatted in hours:minutes:seconds
  seconds;

  return (
    <div className="container">
      <Timer timer={timer} />
      <Buttons startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} saveTime={saveTime} buttonName={buttonName} />
      <ListTimes saved={saved} deleteTime={deleteTime} />
    </div>
  );
}

export default App;