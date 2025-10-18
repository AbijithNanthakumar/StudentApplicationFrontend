import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService.js';

/**
 * Navigation Bar Component
 * Shows different options based on user role
 * Displays user profile image
 */
export const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const isTeacher = authService.isTeacher();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/users" style={styles.logo}>
          📚 Student-Teacher Portal
        </Link>

        <div style={styles.menu}>
          <Link to="/users" style={styles.link}>
            👥 Users
          </Link>

          {isTeacher && (
            <Link to="/users/create" style={styles.link}>
              ➕ Create User
            </Link>
          )}

          <div style={styles.userInfo}>
            {/* ✅ Display user profile image */}
            <img 
              src={user.imageUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)} 
              alt={user.name}
              style={styles.avatar}
              onError={(e) => {
                e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name);
              }}
            />
            <span style={styles.userName}>
              {user.name} ({user.designation})
            </span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1rem 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'opacity 0.3s',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid white',
    objectFit: 'cover',
  },
  userName: {
    color: 'white',
    fontSize: '0.9rem',
  },
  logoutBtn: {
    padding: '0.5rem 1rem',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '2px solid white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
};
