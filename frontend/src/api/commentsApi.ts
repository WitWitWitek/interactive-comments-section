export const CONNECTION_URL = 'https://comments-section-api.onrender.com';

export const getComments = async () => {
  const response = await fetch(`${CONNECTION_URL}/comments`);
  return response.json();
};

export const postComment = async (
  { content, userId, parentId }:
  { content: string, userId: string, parentId: string },
) => {
  const response = await fetch(`${CONNECTION_URL}/${parentId ? 'sub' : ''}comments`, {
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
  const response = await fetch(`${CONNECTION_URL}/${isReply ? 'sub' : ''}comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ updatedContent }),
  });
  return response.json();
};

export const updateCommentScore = async (
  { id, updatedScore, isReply } :
  { id: string, updatedScore: number, isReply: boolean },
) => {
  const response = await fetch(`${CONNECTION_URL}/${isReply ? 'sub' : ''}comments/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ updatedScore }),
  });
  return response.json();
};

export const deleteComment = async (
  { id, isReply }:
  { id: string, isReply: boolean },
): Promise<{ message: string }> => {
  const response = await fetch(`${CONNECTION_URL}/${isReply ? 'sub' : ''}comments/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
