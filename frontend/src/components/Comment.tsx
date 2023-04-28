import { useContext, useState } from 'react';
import { userContext } from '../context/store';
import Modal from './Modal';
import NewCommentForm from './NewCommentForm';
import { ReactComponent as IconPlus } from '../assets/icons/icon-plus.svg';
import { ReactComponent as IconMinus } from '../assets/icons/icon-minus.svg';
import { ReactComponent as IconDelete } from '../assets/icons/icon-delete.svg';
import { ReactComponent as IconReply } from '../assets/icons/icon-reply.svg';
import { ReactComponent as IconEdit } from '../assets/icons/icon-edit.svg';
import EditCommentForm from './EditCommentForm';

export default function Comment({ comment, isReply, setReply }: CommentProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isReplyFormOpen, setIsReplying] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    id, content, createdAt, score, user, replies,
  } = comment;
  const { user: userData } = useContext(userContext);

  return (
    <>
      <div className="comment">
        <div className="comment__header">
          <img src={user.image.webp} alt={user.username} className="comment__user-thumbnail" />
          <p className="comment__user-username">{user.username}</p>
          {
                    user.username === userData?.username
                    && <p className="comment__user-you">you</p>
                }
          <time className="comment__date">{createdAt}</time>
        </div>
        {
          !isEditing
            ? (
              <div className="comment__content">
                {content}
              </div>
            )
            : (
              <EditCommentForm id={id} content={content} isReply={isReply} />
            )
        }
        <div className="comment__score">
          <button type="button">
            <IconPlus />
          </button>
          <p>{score}</p>
          <button type="button">
            <IconMinus />
          </button>
        </div>
        <div className="comment__buttons">
          {
                    user.username === userData?.username
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
                            onClick={() => setIsEditing(() => true)}
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
                            if (setReply) {
                              setReply((prev) => !prev);
                            } else {
                              setIsReplying((prev) => !prev);
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
        {isModalOpen
        && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          commentId={id}
          isReplyComment={isReply}
        />
        )}
      </div>
      {replies && replies?.length > 0 && (
      <div className="comment__replies">
        {replies?.map(
          (reply) => <Comment key={reply.id} comment={reply} isReply setReply={setIsReplying} />,
        )}
        {isReplyFormOpen && <NewCommentForm isReplyForm parentId={id} />}
      </div>
      )}
      {replies && replies.length === 0 && isReplyFormOpen && (
      <div className="comment__replies">
        {isReplyFormOpen && <NewCommentForm isReplyForm parentId={id} />}
      </div>
      )}
    </>
  );
}
