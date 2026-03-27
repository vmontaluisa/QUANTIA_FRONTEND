import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('auth_user');
    window.location.reload();
  };

  return { user, loading, logout };
};

export default useAuth;
