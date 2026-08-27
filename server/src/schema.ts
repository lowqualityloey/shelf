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
  id: serial('id').primaryKey(),
});

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text().notNull(),
  author: text().notNull(),
  isbn: text(),
  description: text(),
  coverUrl: text('cover_url'),
  genre: text(),
});

export const userBooks = pgTable(
  'user_books',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    bookId: integer('book_id')
      .notNull()
      .references(() => books.id, { onDelete: 'cascade' }),
    status: readingStatus().notNull().default('to-read'),
    rating: smallint(),
    notes: text(),
    addedAt: timestamp('added_at').notNull().defaultNow(),
    dateStarted: timestamp('date_started'),
    dateFinished: timestamp('date_finished'),
    favouriteQuotes: text('favorite_quotes'),
    isRecommended: boolean('is_recommended').default(false),
  },

  (table) => [primaryKey({ columns: [table.userId, table.bookId] })],
);
