import { createFileRoute } from '@tanstack/react-router';
import { UserProfile } from '../../components/auth/UserProfile';

export const Route = createFileRoute('/_authenticated/library')({
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <div>
      <h1>My Personal Library</h1>
      <UserProfile />
    </div>
  );
}
