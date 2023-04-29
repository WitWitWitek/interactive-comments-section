import { useState, FormEvent, ChangeEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../api/commentsApi';

type Props = {
  id: string;
  content: string;
  isReply: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
};

export default function EditCommentForm({
  id, content, isReply, setIsEditing,
}: Props) {
  const [updatedContent, setUpdatedContent] = useState<string>(content);

  const queryClient = useQueryClient();

  const updateCommentFn = useMutation({
    mutationFn: updateComment,
    mutationKey: ['comments'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCommentFn.mutate({ id, updatedContent, isReply });
    setIsEditing(() => false);
  };

  const onTextareaChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => setUpdatedContent(e.target.value);

  return (
    <form className="comment__content" onSubmit={handleSubmission}>
      <textarea className="form__textarea" maxLength={255} onChange={onTextareaChange} value={updatedContent} />
      <button type="submit" className="form__button">Send</button>
    </form>
  );
}
