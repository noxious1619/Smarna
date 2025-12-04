import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/db"
import bcrypt from "bcrypt"

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

                // if(password !== 'test123') {
                //     return null
                // }

                return {
                    id: existingUser.id.toString(),
                    email: existingUser.email,
                    username: existingUser.username,
                    name: existingUser.name
                }
            }   
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
} satisfies NextAuthOptions