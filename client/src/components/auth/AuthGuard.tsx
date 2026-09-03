import { useState, type ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  if (loading) {
    return <p>Loading session...</p>;
  }
  if (!user) {
    return isSignUp ? (
      <SignUpForm onToggleMode={() => setIsSignUp(false)} />
    ) : (
      <LoginForm onToggleMode={() => setIsSignUp(true)} />
    );
  }
  return <>{children}</>;
}
