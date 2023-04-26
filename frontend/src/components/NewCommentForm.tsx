import {
  ChangeEvent, FormEvent, useContext, useState,
} from 'react';
import { userContext } from '../context/store';

export default function NewCommentForm({ isReplyForm, parentId }: NewCommentFormProps) {
  const { user } = useContext(userContext);
  const [content, setContent] = useState<string>('');
  const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    if (isReplyForm) {
      fetch('http://localhost:3500/subcomments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, userId: user.userId, parentId }),
      }).catch((err) => console.log(err));
    } else {
      fetch('http://localhost:3500/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, userId: user.userId }),
      }).catch((err) => console.log(err));
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
