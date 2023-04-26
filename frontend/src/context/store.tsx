import {
  createContext, ReactNode, useState, useEffect, useMemo,
} from 'react';

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
  useEffect(() => {
    fetch('http://localhost:3500/users')
      .then((res) => res.json())
      .then((data) => setUser(data[3]));
  }, []);

  const userContextValue = useMemo(() => ({ user, setUser }), [user]);
  return (
    <userContext.Provider value={userContextValue}>
      {children}
    </userContext.Provider>
  );
}
