import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

interface SendEmailOptions {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailOptions) => {
    try {
        // Generate a random token (not using userId directly for security)
        const tokenData = crypto.randomBytes(32).toString('hex');

        // Hash the token before storing in the database
        const hashedToken = await bcryptjs.hash(tokenData, 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                "verification.token": hashedToken,
                "verification.expiry": Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                "forgotPassword.token": hashedToken,
                "forgotPassword.expiry": Date.now() + 3600000,
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.SMTP_USER!,
                pass: process.env.SMTP_PASS!,
            }
        });

        // Send the hashed token in the email
        const mailOptions = {
            from: 'MNHnajib@outlook.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
      </p>`
        };

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};