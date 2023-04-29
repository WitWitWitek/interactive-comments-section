import { ReactComponent as IconDelete } from '../assets/icons/icon-delete.svg';
import { ReactComponent as IconReply } from '../assets/icons/icon-reply.svg';
import { ReactComponent as IconEdit } from '../assets/icons/icon-edit.svg';

type Props = {
  isAuthor: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  setIsReplyFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  setReplyFormAsOpen?: React.Dispatch<React.SetStateAction<boolean>>
};

export default function CommentButtons({
  isAuthor, setIsModalOpen, setIsEditing, setIsReplyFormOpen, setReplyFormAsOpen,
}: Props) {
  return (
    <div className="comment__buttons">
      {
        isAuthor
          ? (
            <>
              <button
                className="comment__delete"
                onClick={() => setIsModalOpen(() => true)}
                type="button"
              >
                <IconDelete />
                {' '}
                Delete
              </button>
              <button
                className="comment__reply"
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                <IconEdit />
                {' '}
                Edit
              </button>
            </>
          )
          : (
            <button
              className="comment__reply"
              onClick={() => {
                if (setReplyFormAsOpen) {
                  setReplyFormAsOpen((prev) => !prev);
                } else {
                  setIsReplyFormOpen((prev) => !prev);
                }
              }}
              type="button"
            >
              <IconReply />
              {' '}
              Reply
            </button>
          )
    }
    </div>
  );
}
