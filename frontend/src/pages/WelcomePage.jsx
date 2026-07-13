import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './WelcomePage.css';

export default function WelcomePage() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-icon" aria-hidden="true">👋</div>
        <h1 className="welcome-title">¡Bienvenido, {username}!</h1>
        <p className="welcome-subtitle">
          Has iniciado sesión correctamente. Tu sesión está activa y protegida con JWT.
        </p>
        <div className="welcome-info">
          <p>
            <strong>Usuario:</strong> {username}
          </p>
          <p>
            <strong>Estado:</strong>{' '}
            <span className="status-badge">Autenticado</span>
          </p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
