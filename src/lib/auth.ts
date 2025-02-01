import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { openAPI } from "better-auth/plugins";
import { sendEmailVerificationEmail } from "@/actions/email-controller";
 
export const auth = betterAuth({
    plugins: [ 
        openAPI(), 
    ],
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    emailAndPassword: {    
        requireEmailVerification: true,
        enabled: true,
        //autoSignIn: false //defaults to true
    },
    rateLimit: {
        storage: "database",
        modelName: "rateLimit", //optional by default "rateLimit" is used
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
          const verificationUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`
          await sendEmailVerificationEmail({
            to: user.email,
            subject: `${process.env.APP_NAME} - Verificação de E-mail`,
            text: `Clique no link para verificar o seu e-mail:  ${verificationUrl}`,
          })
        },
      }
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session