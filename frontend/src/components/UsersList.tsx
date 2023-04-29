import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userContext } from '../context/store';
import getUsers from '../api/usersApi';

export default function UsersList() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user: currentUser, setUser } = useContext(userContext);
  const usersListQuery = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const onUserSelected = (user: User) => {
    setUser(user);
    setIsMenuOpen(() => false);
  };

  if (usersListQuery.isLoading) return <div>Loading...</div>;

  const usersList = usersListQuery.data;

  if (!usersList) return <div>Loading...</div>;

  return (
    <div>
      <nav className={`users-list ${isMenuOpen && 'list-open'}`}>
        <button
          className="users-list__current-user users-list__button "
          onClick={() => setIsMenuOpen((prev) => !prev)}
          type="button"
        >
          <img src={currentUser.image.webp} alt={currentUser.username} className="comment__user-thumbnail" />
          <span>{currentUser.username}</span>
        </button>
        <div className={`users-list__container ${isMenuOpen && 'container-open'}`}>
          {usersList.filter((user) => user.userId !== currentUser.userId).map(
            (user) => (
              <button
                key={user.userId}
                onClick={() => onUserSelected(user)}
                type="button"
                className="users-list__button"
              >
                <img src={user.image.webp} alt={user.username} className="comment__user-thumbnail" />
                <span>{user.username}</span>
              </button>
            ),
          )}
        </div>
      </nav>
    </div>
  );
}
