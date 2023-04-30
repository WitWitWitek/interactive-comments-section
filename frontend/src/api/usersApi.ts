import { CONNECTION_URL } from './commentsApi';

const getUsers = async () => {
  const response = await fetch(`${CONNECTION_URL}/users`);
  return response.json();
};

export default getUsers;
