import { MailDataRequired } from "@sendgrid/mail";
import { SendgridMail } from "../../server";

export default class EmailServices{
    static async SendEmail(message: MailDataRequired | MailDataRequired[]){  
        await SendgridMail.send(message);
    }
}