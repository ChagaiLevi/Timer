import { type TimeProps } from "../types/time"

type lineTimesProps = {
  item: TimeProps,
  deleteTime: (id: string) => void
}

const LineTimes: React.FC<lineTimesProps> = ({ item, deleteTime }) => {
  return (
    <div className="saved-time">
      <p>{item.time}</p>
      <button onClick={() => deleteTime(item.id)}>Delete</button>
    </div>
  )
}

export default LineTimes
