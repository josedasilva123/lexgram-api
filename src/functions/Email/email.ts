import SendGridMail, { MailDataRequired } from "@sendgrid/mail";

export default class EmailServices{
    static async SendEmail(message: MailDataRequired | MailDataRequired[]){
        await SendGridMail.send(message);
    }
}