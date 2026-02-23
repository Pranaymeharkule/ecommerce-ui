import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Restore session on refresh
  useEffect(() => {
    const adminToken = sessionStorage.getItem("token");
    const adminUser = sessionStorage.getItem("user");

    const userToken = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (adminToken && adminUser) {
      setToken(adminToken);
      setUser(JSON.parse(adminUser));
    } else if (userToken && userData) {
      setToken(userToken);
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  // 🔐 Login
  const login = (token, user) => {
    console.log("LOGIN FUNCTION CALLED");
    console.log("TOKEN:", token);
    console.log("USER:", user);

    if (user.role === "admin") {
      // Admin → sessionStorage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      // Customer → localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }

    setToken(token);
    setUser(user);
  };

  // 🚪 Logout
  const logout = () => {
    sessionStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);