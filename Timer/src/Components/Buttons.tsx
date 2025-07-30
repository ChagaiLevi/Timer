const Buttons: React.FC<{ startTimer: () => void, stopTimer: () => void }> = ({ startTimer, stopTimer }) => {
  return (
    <div className="buttons">
      <button id="start" onClick={() => startTimer()}>Start</button>
      <button id="stop" onClick={() => stopTimer()}>Stop</button>
      <button id="save">Save</button>
      <button id="reset">Reset</button>
    </div>
  )
}

export default Buttons