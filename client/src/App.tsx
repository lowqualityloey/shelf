import { AuthProvider } from './context/AuthContext';
import { AuthGuard } from './components/auth/AuthGuard';
import { UserProfile } from './components/auth/UserProfile';

function App() {
  return (
    <AuthProvider>
      <AuthGuard>
        <UserProfile />
      </AuthGuard>
    </AuthProvider>
  );
}

export default App;
