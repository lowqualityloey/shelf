import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  boolean,
  smallint,
  pgEnum,
  primaryKey,
} from 'drizzle-orm/pg-core';

export const readingStatus = pgEnum('reading_status', ['to-read', 'reading', 'finished']);

export const users = pgTable('users', {
  id: text('id').primaryKey(),
});

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  isbn: text('isbn'),
  description: text('description'),
  coverUrl: text('cover_url'),
  genre: text('genre'),
});

export const userBooks = pgTable(
  'user_books',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    bookId: integer('book_id')
      .notNull()
      .references(() => books.id, { onDelete: 'cascade' }),
    status: readingStatus('status').notNull().default('to-read'),
    rating: smallint('rating'),
    notes: text('notes'),
    addedAt: timestamp('added_at').notNull().defaultNow(),
    dateStarted: timestamp('date_started'),
    dateFinished: timestamp('date_finished'),
    favouriteQuotes: text('favorite_quotes'),
    isRecommended: boolean('is_recommended').default(false),
  },
  (table) => [primaryKey({ columns: [table.userId, table.bookId] })],
);

// Define relations for type-safe nested queries
export const usersRelations = relations(users, ({ many }) => ({
  userBooks: many(userBooks),
}));

export const booksRelations = relations(books, ({ many }) => ({
  userBooks: many(userBooks),
}));

export const userBooksRelations = relations(userBooks, ({ one }) => ({
  user: one(users, {
    fields: [userBooks.userId],
    references: [users.id],
  }),
  book: one(books, {
    fields: [userBooks.bookId],
    references: [books.id],
  }),
}));
