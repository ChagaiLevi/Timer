import Timer from "./Components/Timer";
import Buttons from "./Components/Buttons";
import ListTimes from "./Components/ListTimes";
import { useSavedTimes } from "./hooks/useSavedTimes";
import { useTimer } from "./hooks/useTimer";

function App() {
  const { timer, buttonName, startTimer, stopTimer, resetTimer } = useTimer();
  const { saved, saveTime, deleteTime } = useSavedTimes(timer);

  return (
    <div className="container">
      <Timer timer={timer} />
      <Buttons startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} saveTime={saveTime} buttonName={buttonName} />
      <ListTimes saved={saved} deleteTime={deleteTime} />
    </div>
  );
}

export default App;
