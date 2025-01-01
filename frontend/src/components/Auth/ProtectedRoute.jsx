import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;