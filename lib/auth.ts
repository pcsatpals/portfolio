import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`,
                    credentials
                );

                const { user, accessToken, refreshToken } = res.data;

                return {
                    ...user,
                    accessToken,
                    refreshToken,
                };
            },
        }),
    ],

    session: { strategy: "jwt" },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id as string;
            session.accessToken = token.accessToken as string;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};
