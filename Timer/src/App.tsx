import Timer from "./Components/Timer";
import Buttons from "./Components/Buttons";
import ListTimes from "./Components/ListTimes";
import { useState, useEffect, useRef } from "react";

function App() {
  const [timer, setTimer] = useState<string>("00:00:00");
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);

  seconds;
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateTimer = () => {
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

    intervalId.current = setInterval(() => {
      updateTimer();
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, []);

  return (
    <div className="container">
      <Timer timer={timer} />
      <Buttons startTimer={startTimer} stopTimer={stopTimer} />
      <ListTimes />
    </div>
  );
}

export default App;