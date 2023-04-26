import { useContext, useState, useCallback } from 'react';
import { userContext } from '../context/store';
import Modal from './Modal';
import NewCommentForm from './NewCommentForm';
import { ReactComponent as IconPlus } from '../assets/icons/icon-plus.svg';
import { ReactComponent as IconMinus } from '../assets/icons/icon-minus.svg';
import { ReactComponent as IconDelete } from '../assets/icons/icon-delete.svg';
import { ReactComponent as IconReply } from '../assets/icons/icon-reply.svg';
import { ReactComponent as IconEdit } from '../assets/icons/icon-edit.svg';

export default function Comment({ comment, setReply }: CommentProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const {
    id, content, createdAt, score, user, replies,
  } = comment;
  const { user: userData } = useContext(userContext);

  const deleteComment = useCallback(async () => {
    await fetch(`http://localhost:3500/${setReply ? 'sub' : ''}comments/${id}`, {
      method: 'DELETE',
    });
  }, [id]);

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
        <div className="comment__content">
          {content}
        </div>
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
                          <button className="comment__reply" type="button">
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
        {isModalOpen && <Modal deleteCommentFn={deleteComment} setIsModalOpen={setIsModalOpen} />}
      </div>
      {replies && replies?.length > 0 && (
        <div className="comment__replies">
          {replies?.map(
            (reply) => <Comment key={reply.id} comment={reply} setReply={setIsReplying} />,
          )}
          {isReplying && <NewCommentForm isReplyForm parentId={id} />}
        </div>
      )}
      {replies && replies.length === 0 && isReplying && (
        <div className="comment__replies">
          {isReplying && <NewCommentForm isReplyForm parentId={id} />}
        </div>
      )}
    </>
  );
}
