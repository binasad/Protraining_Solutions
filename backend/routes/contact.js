const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'info@synergysafetysolutions.co.uk',
    pass: process.env.EMAIL_PASS || 'your-app-password-here'
  }
});

// POST /api/contact - Submit contact form
router.post('/', [
  body('firstName').notEmpty().trim().withMessage('First name is required'),
  body('lastName').notEmpty().trim().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().trim().withMessage('Phone number is required'),
  body('company').optional().trim(),
  body('message').isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
  body('subject').optional().trim().isLength({ max: 200 }).withMessage('Subject cannot exceed 200 characters'),
  body('preferredContact').optional().isIn(['email', 'phone']).withMessage('Preferred contact must be email or phone')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      message,
      subject = 'New Contact Form Submission',
      preferredContact = 'email'
    } = req.body;

    // Create email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Preferred Contact:</strong> ${preferredContact}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr>
      <h3>Message:</h3>
      <p>${message}</p>
      <hr>
      <p><em>Submitted on: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</em></p>
    `;

    // Send email to company
    const companyEmail = {
      from: process.env.EMAIL_USER || 'info@synergysafetysolutions.co.uk',
      to: process.env.EMAIL_USER || 'info@synergysafetysolutions.co.uk',
      subject: `Contact Form: ${subject}`,
      html: emailContent
    };

    await transporter.sendMail(companyEmail);

    // Send confirmation email to customer
    const customerEmail = {
      from: process.env.EMAIL_USER || 'info@synergysafetysolutions.co.uk',
      to: email,
      subject: 'Thank you for contacting Synergy Safety Solutions',
      html: `
        <h2>Thank you for your message!</h2>
        <p>Dear ${firstName},</p>
        <p>Thank you for contacting Synergy Safety Solutions. We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><strong>Our contact details:</strong></p>
        <p>📧 Email: info@synergysafetysolutions.co.uk</p>
        <p>📞 Phone: 0203 488 2333</p>
        <p>📍 Address: Office No 32 Quantum Offices, 2nd Floor, High Steet, Ilford, England, IG1 1QB</p>
        <hr>
        <p>Best regards,<br>The Synergy Safety Solutions Team</p>
      `
    };

    await transporter.sendMail(customerEmail);

    res.json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting contact form. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/contact/quote - Request quote
router.post('/quote', [
  body('firstName').notEmpty().trim().withMessage('First name is required'),
  body('lastName').notEmpty().trim().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().trim().withMessage('Phone number is required'),
  body('company').notEmpty().trim().withMessage('Company name is required'),
  body('courseInterests').isArray({ min: 1 }).withMessage('At least one course interest is required'),
  body('participants').isInt({ min: 1 }).withMessage('Number of participants must be at least 1'),
  body('preferredDates').optional().isArray().withMessage('Preferred dates must be an array'),
  body('specialRequirements').optional().trim().isLength({ max: 500 }).withMessage('Special requirements cannot exceed 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      courseInterests,
      participants,
      preferredDates,
      specialRequirements
    } = req.body;

    // Create email content for quote request
    const emailContent = `
      <h2>New Quote Request</h2>
      <p><strong>From:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Number of Participants:</strong> ${participants}</p>
      <p><strong>Course Interests:</strong></p>
      <ul>
        ${courseInterests.map(course => `<li>${course}</li>`).join('')}
      </ul>
      ${preferredDates && preferredDates.length > 0 ? `
        <p><strong>Preferred Dates:</strong></p>
        <ul>
          ${preferredDates.map(date => `<li>${new Date(date).toLocaleDateString('en-GB')}</li>`).join('')}
        </ul>
      ` : ''}
      ${specialRequirements ? `<p><strong>Special Requirements:</strong> ${specialRequirements}</p>` : ''}
      <hr>
      <p><em>Submitted on: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</em></p>
    `;

    // Send email to company
    const companyEmail = {
      from: process.env.EMAIL_USER || 'info@synergysafetysolutions.co.uk',
      to: process.env.EMAIL_USER || 'info@synergysafetysolutions.co.uk',
      subject: 'New Quote Request - Synergy Safety Solutions',
      html: emailContent
    };

    await transporter.sendMail(companyEmail);

    // Send confirmation email to customer
    const customerEmail = {
      from: process.env.EMAIL_USER || 'info@synergysafetysolutions.co.uk',
      to: email,
      subject: 'Quote Request Received - Synergy Safety Solutions',
      html: `
        <h2>Quote Request Received!</h2>
        <p>Dear ${firstName},</p>
        <p>Thank you for your quote request. Our team will review your requirements and provide you with a detailed quote within 48 hours.</p>
        <p><strong>Your request details:</strong></p>
        <p>🏢 Company: ${company}</p>
        <p>👥 Participants: ${participants}</p>
        <p>📚 Course Interests: ${courseInterests.join(', ')}</p>
        ${preferredDates && preferredDates.length > 0 ? `<p>📅 Preferred Dates: ${preferredDates.map(date => new Date(date).toLocaleDateString('en-GB')).join(', ')}</p>` : ''}
        ${specialRequirements ? `<p>🔧 Special Requirements: ${specialRequirements}</p>` : ''}
        <hr>
        <p><strong>What happens next?</strong></p>
        <ol>
          <li>Our team will review your requirements</li>
          <li>We'll prepare a detailed quote including pricing and available dates</li>
          <li>You'll receive the quote within 48 hours</li>
          <li>We can discuss any questions or modifications</li>
        </ol>
        <hr>
        <p><strong>Our contact details:</strong></p>
        <p>📧 Email: info@synergysafetysolutions.co.uk</p>
        <p>📞 Phone: 0203 488 2333</p>
        <p>📍 Address: Office No 32 Quantum Offices, 2nd Floor, High Steet, Ilford, England, IG1 1QB</p>
        <hr>
        <p>Best regards,<br>The Synergy Safety Solutions Team</p>
      `
    };

    await transporter.sendMail(customerEmail);

    res.json({
      success: true,
      message: 'Quote request submitted successfully. We will provide you with a detailed quote within 48 hours.'
    });

  } catch (error) {
    console.error('Error submitting quote request:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting quote request. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
