import { NextRequest, NextResponse } from "next/server";
import db from "@/db"
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
    const {email, name, username, password} = await req.json();

    if(
        [email, name, username, password].some((field) => !field?.trim())
    ) {
        return NextResponse.json(
            {error: "All the fields are required !!"}, 
            {status: 400}
        )
    }

    try {
        const existingUser = await db.user.findFirst({
            where: {
                OR: [
                    {email: email},
                    {username: username}
                ]
            }
        })

        if(existingUser) {
            return NextResponse.json(
                {error: "User with this username or email already exists !!"},
                {status: 409}
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const createUser = await db.user.create({
            data: {
                name: name,
                email: email,
                username: username,
                password: hashedPassword,
                refreshToken: "",
                timeZone: ""
            }
        })
    
        if(!createUser) {
            return NextResponse.json(
                {error: "Something went wrong while signing you up !!"}, 
                {status: 500}
            )
        }

        return NextResponse.json(
            {messsage: "User created successfully !!", user: createUser},
            {status: 201}
        )
    } catch (error: any) {
        console.error("Something went wrong while signing in the user : ", error);

        return NextResponse.json(
            {error: error.messsage}, 
            {status: 500}
        )
    }
}