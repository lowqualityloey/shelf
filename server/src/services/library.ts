import { db } from '../db.js';
import { userBooks } from '../schema.js';
import { and, eq } from 'drizzle-orm';

type ReadingStatus = 'to-read' | 'reading' | 'finished';

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
