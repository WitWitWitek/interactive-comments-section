import { useState, useEffect, useContext } from 'react';
import { userContext } from '../context/store';

export default function UsersList() {
  const { user: currentUser, setUser } = useContext(userContext);
  const [usersList, setUsersList] = useState<User[] | null>(null);
  useEffect(() => {
    fetch('http://localhost:3500/users')
      .then((res) => res.json())
      .then((data) => setUsersList(data))
      .catch((err) => console.log(err));
  }, []);

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
