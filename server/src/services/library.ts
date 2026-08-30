import { db } from '../db.js';
import { books, userBooks } from '../schema.js';
import { and, eq } from 'drizzle-orm';

type ReadingStatus = 'to-read' | 'reading' | 'finished';

export interface AddBookInput {
  // Book master data
  title: string;
  author: string;
  isbn?: string;
  description?: string;
  coverUrl?: string;
  genre?: string;

  // Personal user reading data
  status?: ReadingStatus;
  rating?: number;
  notes?: string;
}

export async function getUserLibrary(userId: string, status?: ReadingStatus) {
  const whereClause = status
    ? and(eq(userBooks.userId, userId), eq(userBooks.status, status))
    : eq(userBooks.userId, userId);

  return db.query.userBooks.findMany({
    where: whereClause,
    with: {
      book: true,
    },
  });
}

export async function getUserBook(userId: string, bookId: number) {
  return db.query.userBooks.findFirst({
    where: and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)),
    with: {
      book: true,
    },
  });
}

export async function addBookToLibrary(userId: string, input: AddBookInput) {
  const existingBook = input.isbn
    ? await db.query.books.findFirst({
        where: eq(books.isbn, input.isbn),
      })
    : await db.query.books.findFirst({
        where: and(eq(books.title, input.title), eq(books.author, input.author)),
      });

  const [book] = existingBook
    ? [existingBook]
    : await db
        .insert(books)
        .values({
          isbn: input.isbn,
          title: input.title,
          author: input.author,
          coverUrl: input.coverUrl,
          description: input.description,
          genre: input.genre,
        })
        .returning();

  if (!book) {
    throw new Error('Failed to resolve book');
  }

  await db.insert(userBooks).values({
    userId,
    bookId: book.id,
    status: input.status,
    rating: input.rating,
    notes: input.notes,
  });

  return getUserBook(userId, book.id);
}
