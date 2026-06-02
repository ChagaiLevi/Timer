import { type TimeProps } from "../types/time"
import LineTimes from './LineTimes';

type listTimesProps = {
  saved: TimeProps[];
  deleteTime: (id: string) => void;
}

const ListTimes: React.FC<listTimesProps> = ({ saved, deleteTime }) => {
  return (
    <div className="saved-times">
      {saved.slice(-3).reverse().map((item: TimeProps) => {
        return (
          <LineTimes item={item} key={item.id} deleteTime={deleteTime} />
        )
      })}
    </div>
  )
}

export default ListTimes
