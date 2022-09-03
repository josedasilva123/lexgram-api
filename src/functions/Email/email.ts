import SendGridMail, { MailDataRequired } from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();
SendGridMail.setApiKey(process.env.SENDGRID_API_KEY as string)


export default class EmailServices{
    static async SendEmail(message: MailDataRequired | MailDataRequired[]){  
        await SendGridMail.send(message);
    }
}