import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export function ContextProvider({ children }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);
  //const uri = "http://localhost:3500";
  const uri = "https://youfeat-server.onrender.com";
  const handleLogout = () => {
    fetch(`${uri}/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setAuth(null);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  const handleRefresh = () => {
    fetch(`${uri}/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          handleLogout();
        }
      })
      .then((data) => setAuth(data))
      .catch((err) => console.log(err));
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        uri,
        handleRefresh,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
