import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", },
                password: { label: "Password", type: "password",},
            },
            async authorize(credentials, req) {
                const data = {
                    username: credentials.username,
                    password: credentials.password,
                };

                try {
                    const res = await fetch("https://api.synck.io.vn/api/a/sessions/login", {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });

                    const resData = await res.json();
                    if (res.ok && resData) {
                        return resData;
                    } else {
                        console.error('Authorization failed:', resData);
                        return null;
                    }
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        signOut:'/login',
        error:'/login'
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({token, user}){
            return {...token, ...user}
        },
        async session ({ session, token, user }) {
            session.user = token;
            return session;
        }
    }

};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };