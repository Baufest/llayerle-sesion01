import { useState, useCallback } from 'react';
import { AuthContext } from './authContext';

const SESSION_KEY = 'auth_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_KEY));
  const [username, setUsername] = useState(() => sessionStorage.getItem('auth_username'));

  const login = useCallback((accessToken, user) => {
    sessionStorage.setItem(SESSION_KEY, accessToken);
    sessionStorage.setItem('auth_username', user);
    setToken(accessToken);
    setUsername(user);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('auth_username');
    setToken(null);
    setUsername(null);
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, username, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
