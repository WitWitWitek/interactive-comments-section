import EditCommentForm from './EditCommentForm';

type Props = {
  id: string,
  content: string,
  isEditing: boolean,
  isReply: boolean,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
};

export default function CommentContent({
  id, content, isEditing, isReply, setIsEditing,
}: Props) {
  return (
    !isEditing ? (<div className="comment__content">{content}</div>)
      : (
        <EditCommentForm id={id} content={content} isReply={isReply} setIsEditing={setIsEditing} />
      )
  );
}
