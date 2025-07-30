import { type TimeProps } from "../App"

const LineTimes: React.FC<{
  item: TimeProps,
  index: number,
  deleteTime: (id: string) => void
}> = ({ item, index, deleteTime }) => {
  if (index >= 3) {
    return;
  }

  return (
    <div className="saved-time">
      <p>{item.time}</p>
      <button onClick={() => deleteTime(item.id)}>Delete</button>
    </div>
  )
}

export default LineTimes