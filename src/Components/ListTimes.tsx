import { type TimeProps } from "../App"
import LineTimes from './LineTimes';

type listTimesProps = {
  saved: TimeProps[];
  deleteTime: (id: string) => void;
}

const ListTimes: React.FC<listTimesProps> = ({ saved, deleteTime }) => {
  return (
    <div className="saved-times">
      {saved.slice().reverse().map((item: TimeProps, index: number) => {
        return (
          <LineTimes item={item} index={index} key={item.id} deleteTime={deleteTime} />
        )
      })}
    </div>
  )
}

export default ListTimes