import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  getUserLibrary,
  getUserBook,
  addBookToLibrary,
  AddBookInput,
} from '../services/library.js';

const router = Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const userId = req.user?.id;
    const status = req.query.status as 'to-read' | 'reading' | 'finished' | undefined;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const library = await getUserLibrary(userId, status);
    res.json(library);
  } catch (error) {
    console.error('Error fetching library:', error);
    res.status(500).json({ error: 'Failed to fetch library' });
  }
});

router.get('/:bookId', async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        error: 'Unauthorized',
      });
      return;
    }
    const bookId = Number(req.params.bookId);
    if (isNaN(bookId)) {
      res.status(400).json({ error: 'Invalid book ID' });
      return;
    }
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
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const input: AddBookInput = req.body as AddBookInput;
    if (!input.title || !input.author) {
      res.status(400).json({
        error: 'Title and author are required',
      });
      return;
    }
    const book = await addBookToLibrary(userId, input);
    res.status(201).json(book);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Failed to add book' });
  }
});

export default router;
