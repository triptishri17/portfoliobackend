import { Router } from 'express';
import { downloadResume, getResumeInfo } from '../controllers/resumeController.js';

const router = Router();

// GET /api/resume          → resume metadata
router.get('/', getResumeInfo);

// GET /api/resume/download → download PDF file
router.get('/download', downloadResume);

export default router;
