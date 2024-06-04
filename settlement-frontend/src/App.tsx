import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import PartyA from './components/PartyA';
import PartyB from './components/PartyB';
import { Login } from './components/Login';
import './styles/App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';

interface PrivateRouteProps {
  element: React.ReactElement;
  requiredRole?: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, requiredRole }) => {
  const { isAuthenticated, hasRole } = useAuth();
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  if (requiredRole !== undefined) {
    if (!hasRole(requiredRole) && requiredRole === 0)
      return <Navigate to="/party-b" />;
    if (!hasRole(requiredRole) && requiredRole === 1)
      return <Navigate to="/party-a" />;
  }

  return element;
};

const DefaultRoute: React.FC = () => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (role === 0) {
    return <Navigate to="/party-a" />;
  }

  if (role === 1) {
    return <Navigate to="/party-b" />;
  }

  return null;
};

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login';

  return (
    <AuthProvider>
      <div className='container mx-auto my-8'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/party-a" element={<PrivateRoute element={<PartyA />} requiredRole={0} />} />
          <Route path="/party-b" element={<PrivateRoute element={<PartyB />} requiredRole={1} />} />
          <Route path="*" element={<DefaultRoute />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
