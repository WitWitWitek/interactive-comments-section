import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createContext, ReactNode, useState, useMemo,
} from 'react';
import getUsers from '../api/usersApi';

const userBlueprint = {
  image: {
    png: '',
    webp: '',
  },
  username: '',
  userId: '',
};

export const userContext = createContext<IUserContext>({
  user: {
    ...userBlueprint,
  },
  setUser: () => {},
});

export default function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({ ...userBlueprint });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const usersQuery = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
    onSuccess: (users) => setUser(users[1]),
  });

  const userContextValue = useMemo(() => ({ user, setUser }), [user]);
  return (
    <userContext.Provider value={userContextValue}>
      {children}
    </userContext.Provider>
  );
}
