import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Download Resume ────────────────────────────────────────────────
export const downloadResume = (req, res, next) => {
  try {
    const resumePath = join(__dirname, '..', 'assets', 'Tripti_Shrivastava_Resume.pdf');

    if (!existsSync(resumePath)) {
      return res.status(404).json({
        success: false,
        message: 'Resume file not found. Please contact me directly.',
      });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="Tripti_Shrivastava_Resume.pdf"'
    );
    res.setHeader('Cache-Control', 'no-store');

    res.download(resumePath, 'Tripti_Shrivastava_Resume.pdf', (err) => {
      if (err) next(err);
    });
  } catch (error) {
    next(error);
  }
};

// ─── Resume Info (metadata) ─────────────────────────────────────────
export const getResumeInfo = (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Tripti Shrivastava',
      title: 'Full Stack Developer | MERN Stack | Web3 Enthusiast',
      lastUpdated: '2025-01',
      downloadUrl: '/api/resume/download',
    },
  });
};
