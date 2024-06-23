import { createContext, useContext, useReducer } from 'react';

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case 'logout':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      throw new Error('Ukown action');
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  const login = (email, password) => {
    if (FAKE_USER.email === email && FAKE_USER.password === password)
      dispatch({
        type: 'login',
        payload: FAKE_USER,
      });
  };

  const logout = () => dispatch({ type: 'logout' });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error('AuthContext was used outside AuthProvider');
  return context;
}

export { AuthProvider, useAuth };
