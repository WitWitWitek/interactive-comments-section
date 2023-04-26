import { useState, useEffect } from 'react';
import Comment from './components/Comment';
import NewCommentForm from './components/NewCommentForm';
import UsersList from './components/UsersList';

export default function App() {
  const [comments, setComments] = useState<CommentType[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:3500/comments')
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, []);

  if (!comments) return <div>Loading...</div>;

  return (
    <main>
      <UsersList />
      {comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
      <NewCommentForm isReplyForm={false} />
    </main>
  );
}
