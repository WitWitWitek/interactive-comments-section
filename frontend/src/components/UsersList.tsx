import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userContext } from '../context/store';
import getUsers from '../api/usersApi';

export default function UsersList() {
  const { user: currentUser, setUser } = useContext(userContext);
  const usersListQuery = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (usersListQuery.isLoading) return <div>Loading...</div>;

  const usersList = usersListQuery.data;

  if (!usersList) return <div>Loading...</div>;

  const onSelectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = usersList.find((user) => user.userId === e.target.value);
    if (!selectedUser) return;
    setUser(selectedUser);
  };

  return (
    <div>
      <select className="user-list" name="currentUser" onChange={onSelectUser} value={currentUser.userId}>
        {usersList.map(
          (user) => <option key={user.userId} value={user.userId}>{user.username}</option>,
        )}
      </select>
    </div>
  );
}
