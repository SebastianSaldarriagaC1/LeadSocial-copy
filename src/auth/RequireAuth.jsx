import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function RequireAuth({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      // Guardar en localStorage (o en tu AuthContext)
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Limpiar la URL para que no queden query params
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
