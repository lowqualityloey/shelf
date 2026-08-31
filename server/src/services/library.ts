import { db } from '../db.js';
import { books, userBooks } from '../schema.js';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

// 1. Reading status enum schema
const readingStatusSchema = z.enum(['to-read', 'reading', 'finished']);

// 2. Add Book Schema
export const addBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().optional(),
  description: z.string().optional(),
  coverUrl: z.string().optional(),
  genre: z.string().optional(),
  status: readingStatusSchema.optional().default('to-read'),
  rating: z.number().int().min(1).max(5).optional(),
  notes: z.string().optional(),
});

// 3. Update Book Schema
export const updateBookSchema = z.object({
  status: readingStatusSchema.optional(),
  rating: z
    .number()
    .int()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .optional(),
  notes: z.string().optional(),
  dateStarted: z.coerce.date().optional(),
  dateFinished: z.coerce.date().optional(),
  favouriteQuotes: z.string().optional(),
  isRecommended: z.boolean().optional(),
});

// 4. Auto-derive TypeScript types from schemas
export type AddBookInput = z.infer<typeof addBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type ReadingStatus = z.infer<typeof readingStatusSchema>;

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

export async function updateBookInLibrary(userId: string, bookId: number, input: UpdateBookInput) {
  const existingBook = await db.query.userBooks.findFirst({
    where: and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)),
  });

  if (!existingBook) {
    throw new Error('Book not found in library');
  }

  await db
    .update(userBooks)
    .set(input)
    .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)));

  return getUserBook(userId, bookId);
}

export async function removeBookFromLibrary(userId: string, bookId: number) {
  return db
    .delete(userBooks)
    .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)));
}
