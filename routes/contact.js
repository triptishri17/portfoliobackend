import { Router } from 'express';
import { body } from 'express-validator';
import { sendContactEmail } from '../controllers/contactController.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 80 }).withMessage('Name must be 2–80 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10–2000 characters'),

  body('subject')
    .optional()
    .trim()
    .isLength({ max: 120 }).withMessage('Subject too long'),
];

// POST /api/contact
router.post('/', contactLimiter, contactValidation, sendContactEmail);

export default router;
