import { createContext, useState, useEffect, useContext } from "react";
import { fetchUserSession } from "../utils/auth";
import { redirect } from "next/navigation";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const session = await fetchUserSession();
      setUser(session.estaAutenticado ? session : null);
      setLoading(false);
    }
    loadUser();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8000/accounts/logout/', {

        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        window.location.href = '/';
      }else {
        console.error('Error al cerrar sesión');
      }
    }catch (err) {
      console.error('Error al cerrar sesión', err);
    }
  }
  

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}