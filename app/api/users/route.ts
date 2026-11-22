import userRegistrationRequestSchema from "@/dto/userRegistrationRequest";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const body = await req.json()

        // safe validate and print error

        const validatedBody = await userRegistrationRequestSchema.safeParseAsync(body)

        if (!validatedBody.success) {
            return NextResponse.json({message:validatedBody.error.issues[0].message},{status : 400})
        }

        const exsistingUser = await prisma.user.findFirst(
            {
                where : {
                    email : body.email
                }
            }
        )

        if (exsistingUser != null) {

            return NextResponse.json({message:"User already exsist", user : exsistingUser},{status : 400})
        }

        await prisma.user.create(
            {
                data: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    password: body.password
                }
            }
        )

        return NextResponse.json({message:"User created successfully"})

    } catch (error) {
        
        console.log(error)

        return NextResponse.json({message:"User creation failed"},{status:500})

    }





    return NextResponse.json({ message: "User created successfully" })

}