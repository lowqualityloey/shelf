import { Router } from 'express';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.js';
import { getUserLibrary } from '../services/library.js';

const router = Router();

router.use(authMiddleware);

router.get('/', async (req: AuthenticatedRequest, res) => {
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

export default router;
