const nodemailer = require('nodemailer');

const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Mera App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Aapka Login OTP',
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Assalam-o-Alaikum!</h2>
        <p>Aapka OTP code yeh hai:</p>
        <h1 style="color: #007bff; letter-spacing: 5px;">${otp}</h1>
        <p>Yeh code 5 minute tak valid hai.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Email bhej diya: ${email}`);
};

module.exports = sendEmail;