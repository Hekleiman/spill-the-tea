import React from 'react';

const NavBar = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <>
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: rgba(245, 245, 220, 0.9);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          border-bottom: 2px solid #4a5c3a;
          border-radius: 0 0 15px 15px;
        }
        .nav-links { display: flex; gap: 2rem; list-style: none; margin: 0; padding: 0; }
        .auth-section { display: flex; gap: 1rem; align-items: center; }
        .nav-link {
          text-decoration: none;
          color: inherit;
        }
        .logo-link {
          text-decoration: none;
          color: inherit;
        }
      `}</style>

      <nav className="navbar">
        <a href="/" className="logo logo-link">🍃 Spill the Tea</a>
        
        <ul className="nav-links">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/teas" className="nav-link">Teas</a></li>
          <li><a href="/about" className="nav-link">About</a></li>
        </ul>

        <div className="auth-section">
          {user ? (
            <>
              <span>Hello, {user.username || user.name || user.email}!</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/signin" className="btn btn-secondary nav-link">Sign In</a>
              <a href="/signup" className="btn btn-primary nav-link">Sign Up</a>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;