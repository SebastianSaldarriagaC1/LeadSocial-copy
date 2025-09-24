import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}
