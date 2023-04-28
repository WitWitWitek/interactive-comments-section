import { useQuery, useQueryClient } from '@tanstack/react-query';
import Comment from './components/Comment';
import NewCommentForm from './components/NewCommentForm';
import UsersList from './components/UsersList';
import { getComments } from './api/commentsApi';

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const queryClient = useQueryClient();
  const query = useQuery<CommentType[]>({
    queryKey: ['comments'],
    queryFn: getComments,
  });

  if (query.isLoading) return <div>Loading...</div>;

  return (
    <main>
      <UsersList />
      {query.data?.map((comment) => <Comment key={comment.id} comment={comment} isReply={false} />)}
      <NewCommentForm isReplyForm={false} />
    </main>
  );
}
