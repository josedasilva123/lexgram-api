import SendGridMail, { MailDataRequired } from "@sendgrid/mail";
SendGridMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default class EmailServices{
    static async SendEmail(message: MailDataRequired | MailDataRequired[]){
        await SendGridMail.send(message);
    }
}