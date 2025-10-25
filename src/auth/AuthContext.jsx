import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { authApi } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  // Helper centralizado para persistir auth
  const setAuth = (nextToken, nextUser) => {
    if (typeof nextToken !== "undefined") {
      setToken(nextToken);
      if (nextToken) localStorage.setItem("token", nextToken);
      else localStorage.removeItem("token");
    }
    if (typeof nextUser !== "undefined") {
      setUser(nextUser);
      if (nextUser) localStorage.setItem("user", JSON.stringify(nextUser));
      else localStorage.removeItem("user");
    }
  };

  // Login clásico (API retorna { message, token })
  const login = async ({ email, password }) => {
    const data = await authApi.login({ email, password });
    setAuth(data.accessToken);
    return data;
  };

  // Registro (API retorna { message, user })
  const register = async ({ name, email, password }) => {
    const data = await authApi.register({ name, email, password });
    setAuth(token, data.user); // conserva token actual, solo setea user
    return data;
  };

  // Nuevo: permite “loguear” con un token externo (Instagram OAuth)
  // Úsalo así en el callback: loginWithToken(data.token, data.user)
  const loginWithToken = (tokenFromOAuth, userFromOAuth = null) => {
    setAuth(tokenFromOAuth, userFromOAuth ?? user);
  };

  const logout = () => {
    setAuth(null, null);
  };

  const isAuthenticated = !!token;

  // Sincroniza pestañas (si cierras sesión en otra pestaña)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "token") setToken(localStorage.getItem("token"));
      if (e.key === "user") {
        try {
          setUser(JSON.parse(localStorage.getItem("user")));
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      login,
      register,
      loginWithToken,
      logout,
      setUser,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider />");
  return ctx;
}
