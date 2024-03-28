import nodemailer from "nodemailer";
import { emailSender } from "../../config";

const emailSend = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: emailSender.host,
    port: Number(emailSender.port),
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: emailSender.email,
      pass: emailSender.pass,
    }
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Health Care" <${emailSender.email}>`, // sender address
      to, // list of receivers
      subject: "Forgot Password Link", // Subject line
      html,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};

export default emailSend;
