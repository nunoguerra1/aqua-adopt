import { escapeHtml } from './html'
import { sendEmail } from './send'

export const MAGIC_LINK_EXPIRES_IN_SECONDS = 60 * 5

const minutes = MAGIC_LINK_EXPIRES_IN_SECONDS / 60

export function buildMagicLinkEmail(url: string) {
  const safeUrl = escapeHtml(url)

  return {
    subject: 'Seu link de acesso ao AquaAdopt',
    text: [
      'Olá!',
      '',
      `Use o link abaixo para entrar no AquaAdopt. Ele vale por ${minutes} minutos e só funciona uma vez:`,
      '',
      url,
      '',
      'Se você não pediu este acesso, pode ignorar este e-mail.',
    ].join('\n'),
    html: `<p>Olá!</p>
<p>Use o botão abaixo para entrar no AquaAdopt. O link vale por ${minutes} minutos e só funciona uma vez.</p>
<p><a href="${safeUrl}" style="display:inline-block;padding:12px 24px;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:bold">Entrar no AquaAdopt</a></p>
<p>Se você não pediu este acesso, pode ignorar este e-mail.</p>`,
  }
}

export async function sendMagicLinkEmail({ email, url }: { email: string; url: string }) {
  await sendEmail({ to: email, ...buildMagicLinkEmail(url) })
}
