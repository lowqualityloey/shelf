import { useAuth } from '../../hooks/useAuth';

export function UserProfile() {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="user-profile">
      <h2>My Profile</h2>
      <p>Email: {user?.email}</p>
      <p>User ID: {user?.id}</p>
      <button onClick={handleSignOut} disabled={loading}>
        {loading ? 'Signing out...' : 'Sign Out'}
      </button>
    </div>
  );
}
