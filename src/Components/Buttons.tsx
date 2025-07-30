type functionType = () => void;

const Buttons: React.FC<{
  startTimer: functionType,
  stopTimer: functionType,
  resetTimer: functionType,
  saveTime: functionType,
  buttonName: string
}> = ({ startTimer, stopTimer, resetTimer, saveTime, buttonName }) => {
  return (
    <div className="buttons">
      <button id="start" onClick={() => startTimer()}>{buttonName}</button>
      <button id="stop" onClick={() => stopTimer()}>Stop</button>
      <button id="save" onClick={() => saveTime()}>Save</button>
      <button id="reset" onClick={() => resetTimer()}>Reset</button>
    </div>
  )
}

export default Buttons