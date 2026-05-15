import { sendEmail } from '../utils/sendEmail.js';

export const sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message are required',
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    const finalSubject = subject?.trim()
      ? subject
      : `Portfolio Contact from ${name}`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Portfolio Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${finalSubject}</p>

        <hr />

        <p><strong>Message:</strong></p>

        <div style="background:#f4f4f4;padding:16px;border-radius:8px;">
          ${message.replace(/\n/g, '<br/>')}
        </div>
      </div>
    `;

    await sendEmail({
      subject: finalSubject,
      html,
      replyTo: email,
    });

    console.log('[Contact] Email sent successfully');

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('========== CONTACT API ERROR ==========');
    console.error(error);
    console.error('MESSAGE:', error.message);
    console.error('STACK:', error.stack);

    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send message',
      error: error.message,
    });
  }
};
