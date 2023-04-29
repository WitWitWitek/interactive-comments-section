import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ReactComponent as IconPlus } from '../assets/icons/icon-plus.svg';
import { ReactComponent as IconMinus } from '../assets/icons/icon-minus.svg';
import { updateCommentScore } from '../api/commentsApi';

type Props = {
  id: string,
  score: number,
  isReply: boolean
};

export default function Score({ id, score, isReply }: Props) {
  const [updatedScore, setUpdatedScore] = useState<number>(score);
  const queryClient = useQueryClient();

  const updateCommentScoreFn = useMutation({
    mutationFn: updateCommentScore,
    mutationKey: ['comments'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const increaseScoreHandler = () => {
    updateCommentScoreFn.mutate({ id, updatedScore: updatedScore + 1, isReply });
    setUpdatedScore((prev) => prev + 1);
  };
  const decreaseScoreHandler = () => {
    updateCommentScoreFn.mutate({ id, updatedScore: updatedScore - 1, isReply });
    setUpdatedScore((prev) => prev - 1);
  };

  return (
    <div className="comment__score">
      <button type="button" onClick={() => increaseScoreHandler()}>
        <IconPlus />
      </button>
      <p>{updatedScore}</p>
      <button type="button" onClick={() => decreaseScoreHandler()}>
        <IconMinus />
      </button>
    </div>
  );
}
