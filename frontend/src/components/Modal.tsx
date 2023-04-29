import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../api/commentsApi';

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  commentId: string,
  isReplyComment: boolean,
};

export default function Modal({ setIsModalOpen, commentId, isReplyComment }: Props) {
  const modalRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const deleteCommentFn = useMutation({
    mutationFn: deleteComment,
    mutationKey: ['comments'],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments'] }),
  });

  useEffect(() => {
    modalRef.current = document.getElementById('modal')! as HTMLDivElement;
    setMounted(true);
  }, []);

  const acceptClickHandler = () => {
    deleteCommentFn.mutate({ id: commentId, isReply: isReplyComment });
    setIsModalOpen(() => false);
  };

  const modalStructure = (
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

  return mounted && modalRef.current ? createPortal(modalStructure, modalRef.current) : null;
}
