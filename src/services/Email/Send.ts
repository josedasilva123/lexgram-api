import { MailDataRequired } from "@sendgrid/mail";
import { SendgridMail } from "../../server";

export class EmailSend{
    async execute(message: MailDataRequired | MailDataRequired[]){  
        await SendgridMail.send(message);
    }
}