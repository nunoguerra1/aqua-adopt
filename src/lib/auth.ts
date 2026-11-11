import { betterAuth } from 'better-auth'
import { prismaAdapter } from '@better-auth/prisma-adapter'
import { magicLink } from 'better-auth/plugins'
import { prisma } from '@/lib/prisma'
import { isAdminEmail } from '@/lib/auth/roles'
import { MAGIC_LINK_EXPIRES_IN_SECONDS, sendMagicLinkEmail } from '@/lib/email/magic-link'

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),

  user: {
    additionalFields: {
      role: { type: 'string', required: false, defaultValue: 'USER', input: false },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => ({
          data: {
            ...user,
            role: isAdminEmail(user.email, process.env.ADMIN_EMAILS) ? 'ADMIN' : 'USER',
          },
        }),
      },
    },
  },

  plugins: [
    magicLink({
      expiresIn: MAGIC_LINK_EXPIRES_IN_SECONDS,
      sendMagicLink: async ({ email, url }) => {
        await sendMagicLinkEmail({ email, url })
      },
    }),
  ],
})
