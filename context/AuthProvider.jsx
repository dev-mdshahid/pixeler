import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../lib/appwrite';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      getCurrentUser().then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser({});
        }
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('From Root layout: ' + error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: user, isLoggedIn: isLoggedIn, isLoading: isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const getUserSession = () => {
  const userContext = useContext(AuthContext);
  return userContext;
};
