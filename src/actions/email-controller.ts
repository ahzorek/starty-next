import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmailVerificationEmail = async ({to, subject, text}:{to: string, subject: string, text: string}) => {
  await resend.emails.send({
    from: 'verify@mailing.iscoding.online',
    to,
    subject,
    text
  })
}