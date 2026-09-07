import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useLibrary, useUpdateBookStatus } from '../../hooks/useLibrary';
import { ShelfSelector, type ShelfFilter } from '../../components/books/ShelfSelector';
import { BookCard } from '../../components/books/BookCard';

export const Route = createFileRoute('/_authenticated/library')({
  component: LibraryPage,
});

function LibraryPage() {
  const [selectedShelf, setSelectedShelf] = useState<ShelfFilter>('all');
  const {
    data: books = [],
    isLoading,
    error,
  } = useLibrary(selectedShelf === 'all' ? undefined : selectedShelf);
  const updateStatusMutation = useUpdateBookStatus();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Personal Library</h1>
      <ShelfSelector selectedShelf={selectedShelf} onSelectShelf={setSelectedShelf} />
      {isLoading && <p>Loading bookshelf...</p>}
      {error && <p className="text-red-500">Failed to load books</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {books.map((book) => (
          <BookCard
            key={book.bookId}
            title={book.title}
            author={book.author}
            coverUrl={book.coverUrl ?? undefined}
            status={book.status}
            onStatusChange={(newStatus) => {
              updateStatusMutation.mutate({ bookId: book.bookId, status: newStatus });
            }}
          />
        ))}
      </div>
    </div>
  );
}
