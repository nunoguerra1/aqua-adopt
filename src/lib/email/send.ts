import nodemailer from 'nodemailer'

type Email = {
  to: string
  subject: string
  text: string
  html: string
}

export async function sendEmail({ to, subject, text, html }: Email) {
  const host = process.env.SMTP_HOST

  if (!host) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SMTP_HOST não configurado: não é possível enviar e-mails em produção.')
    }
    console.log(`\n[e-mail simulado]\nPara: ${to}\nAssunto: ${subject}\n\n${text}\n`)
    return
  }

  const from = process.env.EMAIL_FROM ?? process.env.SMTP_USER
  if (!from) {
    throw new Error('Defina EMAIL_FROM ou SMTP_USER para enviar e-mails.')
  }

  const port = Number(process.env.SMTP_PORT ?? 465)
  const { SMTP_USER: user, SMTP_PASSWORD: pass } = process.env

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  })

  await transporter.sendMail({ from, to, subject, text, html })
}
