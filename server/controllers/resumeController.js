import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

export const downloadResume = (req, res, next) => {
  try {
    const assetsDir = join(__dirname, '..', 'assets');

    // Auto-find any PDF in server/assets/ — no hardcoded filename
    let resumePath = null;

    if (existsSync(assetsDir)) {
      const files = readdirSync(assetsDir);
      const pdf   = files.find(f => f.toLowerCase().endsWith('.pdf'));
      if (pdf) resumePath = join(assetsDir, pdf);
    }

    if (!resumePath) {
      console.error('[Resume] No PDF found in server/assets/');
      console.error('[Resume] Please copy your PDF to server/assets/');
      return res.status(404).json({
        success: false,
        message: 'Resume not found. Please contact me at shrivastavtripti5472@gmail.com',
      });
    }

    console.log('[Resume] Serving:', resumePath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Tripti_Shrivastava_Resume.pdf"');
    res.setHeader('Cache-Control', 'no-store');

    res.download(resumePath, 'Tripti_Shrivastava_Resume.pdf', (err) => {
      if (err && !res.headersSent) next(err);
    });
  } catch (error) {
    next(error);
  }
};

export const getResumeInfo = (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Tripti Shrivastava',
      title: 'Full Stack Developer | MERN Stack | Web3 Enthusiast',
      downloadUrl: '/api/resume/download',
    },
  });
};
