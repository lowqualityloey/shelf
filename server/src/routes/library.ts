import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  getUserLibrary,
  getUserBook,
  addBookToLibrary,
  updateBookInLibrary,
  removeBookFromLibrary,
  addBookSchema,
  updateBookSchema,
} from '../services/library.js';

const router = Router();

router.use(authMiddleware);

router.param('bookId', (_req, res, next, id) => {
  const bookId = Number(id);
  if (isNaN(bookId)) {
    res.status(400).json({ error: 'Invalid book ID' });
    return;
  }
  next();
});

router.get('/', async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const status = req.query.status as 'to-read' | 'reading' | 'finished' | undefined;

    const library = await getUserLibrary(userId, status);
    res.json(library);
  } catch (error) {
    console.error('Error fetching library:', error);
    res.status(500).json({ error: 'Failed to fetch library' });
  }
});

router.get('/:bookId', async (req, res) => {
  try {
    const userId = req.user!.id;
    const bookId = Number(req.params.bookId);

    const book = await getUserBook(userId, bookId);
    if (!book) {
      res.status(404).json({ error: 'Book not found in library' });
      return;
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const result = addBookSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation failed',
        details: result.error.issues,
      });
      return;
    }

    const book = await addBookToLibrary(userId, result.data);

    res.status(201).json(book);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Failed to add book' });
  }
});

router.patch('/:bookId', async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const bookId = Number(req.params.bookId);

    const result = updateBookSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation failed',
        details: result.error.issues,
      });
      return;
    }

    const updated = await updateBookInLibrary(userId, bookId, result.data);

    res.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === 'Book not found in library') {
      res.status(404).json({ error: error.message });
      return;
    }
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

router.delete('/:bookId', async (req, res) => {
  try {
    const userId = req.user!.id;
    const bookId = Number(req.params.bookId);

    await removeBookFromLibrary(userId, bookId);
    res.status(204).send();
  } catch (error) {
    console.error('Error removing book', error);
    res.status(500).json({ error: 'Failed to remove book from library' });
  }
});

export default router;
