import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';

const roleRedirectMap = {
  ADMIN: '/admin/dashboard',
  USER: '/dashboard',
};

const normalizeRole = (role) => role?.toUpperCase();

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector(selectAuth);

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role based access
  if (requiredRole) {
    const userRole = normalizeRole(user?.role);
    const expectedRole = normalizeRole(requiredRole);

    if (!userRole || userRole !== expectedRole) {
      return (
        <Navigate
          to={roleRedirectMap[userRole] || '/'}
          replace
        />
      );
    }
  }

  return children;
};

export default ProtectedRoute;






// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectAuth } from '../features/auth/authSlice';

// const ProtectedRoute = ({ children, requiredRole }) => {
//     const { isAuthenticated, user } = useSelector(selectAuth);

//     if (!isAuthenticated) return <Navigate to="/login" replace />;

//     if (requiredRole) {
//         const role = user?.role?.toUpperCase();
//         const reqRole = requiredRole.toUpperCase();

//         if (role !== reqRole) {
//             // redirect based on role mismatch
//             if (reqRole === 'ADMIN') return <Navigate to="/dashboard" replace />;
//             if (reqRole === 'USER') return <Navigate to="/admin/dashboard" replace />;
//             // optional: fallback
//             return <Navigate to="/" replace />;
//         }
//     }

//     return children;
// };

// export default ProtectedRoute;
