import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/library/$bookId')({
  component: BookDetailsPage,
});

function BookDetailsPage() {
  const { bookId } = Route.useParams();
  const numericId = Number(bookId);

  if (isNaN(numericId)) {
    return (
      <div>
        <p>Invalid book ID: "{bookId}" is not a number.</p>
        <Link to="/library">← Back to My Library</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/library">← Back to My Library</Link>
      <h1>Book Details for Book #{numericId}</h1>
    </div>
  );
}
