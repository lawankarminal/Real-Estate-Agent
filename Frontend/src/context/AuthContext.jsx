import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// Provide Authentication State & Functions
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Load token from localStorage when the app starts
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  // Login function (Stores token in state & localStorage)
  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token);
  };

  // Logout function (Clears token from state & localStorage)
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
export const useAuth = () => useContext(AuthContext);
