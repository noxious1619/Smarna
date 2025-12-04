import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/db"
import bcrypt from "bcrypt"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: {label: "email", type: "text", placeholder: ""},
                password: {label: "password", type: "password"}
            },

            async authorize(credentials, req) {

                if(!credentials?.username || !credentials.password) {
                    return null
                }

                const username = credentials.username;
                const password = credentials.password;

                console.log(username, password);    

                const existingUser = await db.user.findFirst({
                    where: {
                        email: username
                    }
                })

                if(!existingUser) {
                    return null
                }

                const isPasswordValid = await bcrypt.compare(password, existingUser.password)

                if(!isPasswordValid) {
                    return null
                }

                return {
                    id: existingUser.id.toString(),
                    email: existingUser.email,
                    username: existingUser.username,
                    name: existingUser.name
                }
            }   
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt ({token, account, profile}) {
            console.log(profile);

            if(account?.provider === 'google') {
                const user = await db.user.upsert({
                where: { 
                    email: profile!.email
                },
                update: {}, 
                create: {
                    email: profile!.email as string,
                    name: profile!.name as string,
                    username: profile!.email as string, 
                    password: "", 
                    refreshToken: "", 
                    timeZone: "",
                }
                });

                token.id = user.id.toString();
                token.email = user.email
                token.name = user.name
            }

            return token;
        },

        async session ({session, token}) {
            if(session?.user && token) {
                (session.user)!.email = token.email as string;
                (session.user)!.name = token.name as string;
            }

            return session;
        }
    }
} satisfies NextAuthOptions