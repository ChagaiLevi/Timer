type timerProps = {
  timer: string;
}

const Timer: React.FC<timerProps> = ({ timer }) => {
  return (
    <div id="timer">{timer}</div>
  )
}

export default Timer