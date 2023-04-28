import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../api/commentsApi';

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  commentId: string,
  isReplyComment: boolean,
};

export default function Modal({ setIsModalOpen, commentId, isReplyComment }: Props) {
  const queryClient = useQueryClient();

  const deleteCommentFn = useMutation({
    mutationFn: deleteComment,
    mutationKey: ['comments'],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments'] }),
  });

  const acceptClickHandler = () => {
    deleteCommentFn.mutate({ id: commentId, isReply: isReplyComment });
    setIsModalOpen(() => false);
  };

  return (
    <>
      <div className="backdrop" />
      <div className="modal">
        <h2>Delete comment</h2>
        <p>
          Are you sure you want to delete this comment?
          This will remove the comment and can&apos;t be undone.
        </p>
        <div>
          <button className="modal__button modal__button--cancel" onClick={() => setIsModalOpen(() => false)} type="button">
            no, cancel
          </button>
          <button
            className="modal__button modal__button--delete"
            type="button"
            onClick={acceptClickHandler}
          >
            yes, delete
          </button>
        </div>
      </div>
    </>
  );
}
