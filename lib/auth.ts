import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
            },
            async authorize(credentials) {
                console.log(credentials)
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_APP_URL}/api/login`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        }),
                    }
                );
                console.log(res.ok, `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`)
                if (!res.ok) return null;

                const { user, accessToken, refreshToken } = await res.json();
                console.log(user)
                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.userName,
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
            if (session.user) {
                session.user.id = token.id as string;
            }
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
    pages: { signIn: "/login", error: "/login" },
    secret: process.env.NEXTAUTH_SECRET,
};
