import { Outlet, createRootRoute, Link } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const { user, signOut } = useAuth();

  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <Link to="/" className="brand">
            📚 Shelf
          </Link>
        </div>
        <nav className="navbar-center">
          <Link to="/" className="nav-link">
            Search
          </Link>
          <Link to="/library" className="nav-link">
            My Library
          </Link>
        </nav>
        <div className="navbar-right">
          {user ? (
            <>
              <span>{user.email}</span>
              <button onClick={signOut}>Sign Out</button>
            </>
          ) : (
            <Link to="/library">Log In</Link>
          )}
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© 2026 Shelf — Personal Reading Tracker</p>
      </footer>
    </>
  );
}
