import 'dotenv/config';
import libraryRouter from './routes/library.js';
import express from 'express';
import { authMiddleware, AuthenticatedRequest } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use('/api/library', libraryRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/me', authMiddleware, (req: AuthenticatedRequest, res) => {
  res.json({
    message: 'Authenticated successfully!',
    userId: req.user?.id,
    email: req.user?.email,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
