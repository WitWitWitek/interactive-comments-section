import { useContext, useState } from 'react';
import { userContext } from '../context/store';
import Modal from './Modal';
import NewCommentForm from './NewCommentForm';
import Score from './CommentScore';
import CommentHeader from './CommentHeader';
import CommentContent from './CommentContent';
import CommentButtons from './CommentButtons';

export default function Comment({ comment, isReply, setReplyFormAsOpen }: CommentProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    id, content, createdAt, score, user, replies,
  } = comment;
  const { user: userData } = useContext(userContext);

  return (
    <>
      <div className="comment">
        <CommentHeader
          image={user.image.webp}
          username={user.username}
          isAuthor={user.username === userData?.username}
          createdAt={createdAt}
        />
        <CommentContent
          id={id}
          content={content}
          isEditing={isEditing}
          isReply={isReply}
          setIsEditing={setIsEditing}
        />
        <Score
          id={id}
          score={score}
          isReply={isReply}
        />
        <CommentButtons
          isAuthor={user.username === userData?.username}
          setIsModalOpen={setIsModalOpen}
          setIsEditing={setIsEditing}
          setIsReplyFormOpen={setIsReplyFormOpen}
          setReplyFormAsOpen={setReplyFormAsOpen}
        />
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
            (reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                isReply
                setReplyFormAsOpen={setIsReplyFormOpen}
              />
            ),
          )}
          {isReplyFormOpen
          && (
          <NewCommentForm
            isReplyForm
            parentId={id}
            setIsReplyFormOpen={setIsReplyFormOpen}
          />
          )}
        </div>
      )}
      {replies && replies.length === 0 && isReplyFormOpen && (
        <div className="comment__replies">
          {isReplyFormOpen
          && (
          <NewCommentForm
            isReplyForm
            parentId={id}
            setIsReplyFormOpen={setIsReplyFormOpen}
          />
          )}
        </div>
      )}
    </>
  );
}
