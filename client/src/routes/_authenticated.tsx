import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AuthGuard } from '../components/auth/AuthGuard';

export const Route = createFileRoute('/_authenticated')({
  component: () => (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  ),
});
