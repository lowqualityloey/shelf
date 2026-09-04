import { useEffect, useState } from 'react';
import { mapOpenLibraryDocToBook } from '../lib/openLibrary';
import type { BookSearchResult, OpenLibrarySearchResponse } from '../types/book';
import { useDebounce } from './useDebounce';

export interface UseBookSearchResult {
  searchResults: BookSearchResult[];
  isLoading: boolean;
  error: string | null;
}

export function useBookSearch(query: string): UseBookSearchResult {
  const debouncedQuery = useDebounce(query, 300);
  const [books, setBooks] = useState<BookSearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = debouncedQuery.trim();
  const isQueryEmpty = trimmed.length === 0;

  useEffect(() => {
    if (isQueryEmpty) {
      return;
    }

    const controller = new AbortController();

    (async () => {
      if (controller.signal.aborted) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(trimmed)}&limit=20`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data: OpenLibrarySearchResponse = await response.json();
        if (controller.signal.aborted) {
          return;
        }

        const mappedBooks = data.docs.map(mapOpenLibraryDocToBook);
        setBooks(mappedBooks);
      } catch (err) {
        if (!controller.signal.aborted && err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    })();

    return () => controller.abort();
  }, [isQueryEmpty, trimmed]);

  return {
    searchResults: isQueryEmpty ? [] : books,
    isLoading: isQueryEmpty ? false : loading,
    error: isQueryEmpty ? null : error,
  };
}
