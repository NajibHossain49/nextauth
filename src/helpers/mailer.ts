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
            html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2>${emailType === "VERIFY" ? "Verify Your Email Address" : "Reset Your Password"}</h2>
            <p>Please click the button below to ${emailType === "VERIFY" ? "verify your email address" : "reset your password"}.</p>
            <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}" 
               style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
            </a>
        </div>
    `
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