import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div>
      <h1>Search & Discover Books</h1>
      <p>Find your next favorite book and track your reading journey.</p>
    </div>
  );
}
