import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="p-8 rounded-xl bg-surface shadow-card border border-surface-border text-center my-8 mx-auto max-w-xl">
      <h1 className="text-4xl font-bold text-text-heading font-heading">Search & Discover Books</h1>
      <p className="text-text-main">Find your next favorite book and track your reading journey.</p>
    </div>
  );
}
