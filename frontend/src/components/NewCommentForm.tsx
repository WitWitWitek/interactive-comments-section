import {
  ChangeEvent, FormEvent, useContext, useState,
} from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userContext } from '../context/store';
import { postComment } from '../api/commentsApi';

export default function NewCommentForm(
  { isReplyForm, parentId, setIsReplyFormOpen }: NewCommentFormProps,
) {
  const { user } = useContext(userContext);
  const [content, setContent] = useState<string>('');
  const queryClient = useQueryClient();

  const postCommentFn = useMutation({
    mutationFn: postComment,
    mutationKey: ['comments'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    postCommentFn.mutate({ content, userId: user.userId, parentId: (isReplyForm && parentId) ? parentId : '' });
    if (setIsReplyFormOpen) {
      setIsReplyFormOpen(() => false);
    }
  };

  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  return (
    <form className="comment form" onSubmit={handleSubmission}>
      <textarea name="content" placeholder="Add a comment..." className="form__textarea" maxLength={255} value={content} onChange={onTextareaChange} />
      <img src={user?.image.webp} alt={user?.username} className="comment__user-thumbnail" />
      <button type="submit" className="form__button">{!isReplyForm ? 'Send' : 'Reply'}</button>
    </form>
  );
}
