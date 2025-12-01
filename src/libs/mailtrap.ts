import { id } from 'zod/v4/locales';
import { MailtrapClient } from "mailtrap"

export const sendEmail = async (to: string, subject: string, body: string) => {

    const mailtrap = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN as string,
        testInboxId: 4223538
    })

    try {
        await mailtrap.testing.send({
            from: { name: 'Sistema', email: 'sitema@google.com.br' },
            to: [{ email: to }],
            subject,
            text: body,
        });
        return true;
    } catch (err) {
        return false;
    }

}