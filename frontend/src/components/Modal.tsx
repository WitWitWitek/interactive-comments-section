import React from 'react';

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  deleteCommentFn: any
};

export default function Modal({ setIsModalOpen, deleteCommentFn }: Props) {
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
          <button className="modal__button modal__button--delete" type="button" onClick={() => deleteCommentFn()}>
            yes, delete
          </button>
        </div>
      </div>
    </>
  );
}
