import { ReactComponent as IconPlus } from '../assets/icons/icon-plus.svg';
import { ReactComponent as IconMinus } from '../assets/icons/icon-minus.svg';

type Props = {
  score: number
};

export default function Score({ score }: Props) {
  return (
    <div className="comment__score">
      <button type="button">
        <IconPlus />
      </button>
      <p>{score}</p>
      <button type="button">
        <IconMinus />
      </button>
    </div>
  );
}
