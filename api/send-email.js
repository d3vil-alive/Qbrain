const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, data } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    switch (type) {
      case 'contact':
        // Send to admin
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'nkalam.ind@gmail.com',
          subject: `New Contact Message: ${data.subject}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>From:</strong> ${data.name} (${data.email})</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message}</p>
          `
        });

        // Send auto-reply
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: data.email,
          subject: 'Thank you for contacting Qbrain',
          html: `
            <h2>Thank you for reaching out!</h2>
            <p>Hi ${data.name},</p>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <p>Best regards,<br>Team Qbrain</p>
          `
        });
        break;

      case 'application':
        // Send to admin
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'nkalam.ind@gmail.com',
          subject: `New Team Application - ${data.personalInfo.fullName}`,
          html: `
            <h2>New Team Application</h2>
            <p><strong>Name:</strong> ${data.personalInfo.fullName}</p>
            <p><strong>Email:</strong> ${data.personalInfo.email}</p>
            <p><strong>Phone:</strong> ${data.personalInfo.phone}</p>
            <p><strong>Role:</strong> ${data.personalInfo.preferredRole}</p>
            <p><strong>Branch:</strong> ${data.personalInfo.branch}</p>
            <p><strong>Year:</strong> ${data.personalInfo.year}</p>
            <p><strong>Quiz Score:</strong> ${data.quizResults?.score || 'Not completed'}%</p>
            <p><strong>Motivation:</strong></p>
            <p>${data.personalInfo.motivation}</p>
          `
        });

        // Send confirmation
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: data.personalInfo.email,
          subject: 'Application Received - Qbrain Team',
          html: `
            <h2>Application Received!</h2>
            <p>Hi ${data.personalInfo.fullName},</p>
            <p>Thank you for applying to join the Qbrain team! We've received your application and will review it shortly.</p>
            <p>Next steps:</p>
            <ul>
              <li>We'll review your application and quiz results</li>
              <li>If selected, we'll contact you for an interview</li>
              <li>Final selection will be communicated via email</li>
            </ul>
            <p>Best regards,<br>Team Qbrain</p>
          `
        });
        break;

      default:
        return res.status(400).json({ message: 'Invalid email type' });
    }

    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}