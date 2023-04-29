type Props = {
  image: string,
  username: string,
  isAuthor: boolean,
  createdAt: string
};

export default function CommentHeader({
  image,
  username,
  isAuthor,
  createdAt,
}: Props) {
  return (
    <div className="comment__header">
      <img src={image} alt={username} className="comment__user-thumbnail" />
      <p className="comment__user-username">{username}</p>
      {
        isAuthor
        && <p className="comment__user-you">you</p>
        }
      <time className="comment__date">{createdAt}</time>
    </div>
  );
}
