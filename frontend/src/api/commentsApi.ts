export const getComments = async () => {
  const response = await fetch('http://localhost:3500/comments');
  return response.json();
};

export const postComment = async (
  { content, userId, parentId }:
  { content: string, userId: string, parentId: string },
) => {
  const response = await fetch(`http://localhost:3500/${parentId ? 'sub' : ''}comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parentId ? { content, userId, parentId } : { content, userId }),
  });
  return response.json();
};

export const updateComment = async (
  { id, updatedContent, isReply } :
  { id: string, updatedContent: string, isReply: boolean },
) => {
  const response = await fetch(`http://localhost:3500/${isReply ? 'sub' : ''}comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ updatedContent }),
  });
  return response.json();
};

export const deleteComment = async (
  { id, isReply }:
  { id: string, isReply: boolean },
): Promise<{ message: string }> => {
  const response = await fetch(`http://localhost:3500/${isReply ? 'sub' : ''}comments/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
