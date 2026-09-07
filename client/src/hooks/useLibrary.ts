import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import type { ReadingStatus } from '../types/book';

export interface UserLibraryBook {
  bookId: number;
  status: ReadingStatus;
  rating?: number | null;
  title: string;
  author: string;
  coverUrl?: string | null;
}

export const LIBRARY_QUERY_KEY = ['library'] as const;

export function useLibrary(status?: ReadingStatus) {
  return useQuery({
    queryKey: LIBRARY_QUERY_KEY,
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw = await apiFetch<any[]>('/api/library');
      return raw.map((item) => ({
        bookId: item.bookId,
        status: (item.status === 'to-read'
          ? 'want-to-read'
          : item.status === 'reading'
            ? 'currently-reading'
            : 'read') as ReadingStatus,
        rating: item.rating,
        title: item.book?.title ?? item.title,
        author: item.book?.author ?? item.author,
        coverUrl: item.book?.coverUrl ?? item.coverUrl,
      })) as UserLibraryBook[];
    },
    select: (library) => (status ? library.filter((book) => book.status === status) : library),
  });
}

export function useUpdateBookStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookId, status }: { bookId: number; status: ReadingStatus }) => {
      const serverStatus =
        status === 'want-to-read' ? 'to-read' : status === 'read' ? 'finished' : 'reading';

      await apiFetch(`/api/library/${bookId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: serverStatus }),
      });
    },

    onMutate: async ({ bookId, status }) => {
      // a. Cancel any outgoing refetches so they don't overwrite our optimistic update:
      await queryClient.cancelQueries({ queryKey: LIBRARY_QUERY_KEY });

      // b. Snapshot the previous library cache:
      const previousLibrary = queryClient.getQueryData<UserLibraryBook[]>(LIBRARY_QUERY_KEY);

      // c. Optimistically update the cache right now:
      queryClient.setQueryData<UserLibraryBook[]>(LIBRARY_QUERY_KEY, (old = []) =>
        old.map((book) => (book.bookId === bookId ? { ...book, status } : book)),
      );

      // d. Return context object containing the snapshot:
      return { previousLibrary };
    },

    onError: (_err, _variables, context) => {
      // If the mutation fails, roll back to the snapshot!
      if (context?.previousLibrary) {
        queryClient.setQueryData(LIBRARY_QUERY_KEY, context.previousLibrary);
      }
    },

    onSettled: () => {
      // Always invalidate to ensure 100% sync with the server database!
      queryClient.invalidateQueries({ queryKey: LIBRARY_QUERY_KEY });
    },
  });
}
