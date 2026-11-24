import { Status } from "@/app/generated/prisma/enums";
import userAuthenticationRequestSchema from "@/dto/userAuthenticationRequest";
import prisma from "@/lib/prisma";
import bcrypt, { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { permission } from "process";


export async function POST(req: NextRequest) {



    try {

        const body = await req.json()

        const parseBody = userAuthenticationRequestSchema.safeParse(body)

        if (!parseBody.success) {
            return NextResponse.json({ message: parseBody.error.issues[0].message }, { status: 400 })
        }

        const user = await prisma.user.findFirst(
            {
                where: {
                    email: body.email
                }
            }
        )

        if (user == null) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        if (user.status != Status.ACTIVE) {
            return NextResponse.json({ message: "Your account is locked or deleted. Please contact our support panel" }, { status: 401 })
        }

        const isPasswordMatch = await compare(body.password, user.password)

        if (isPasswordMatch) {

            const userInformation = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                image: user.image,
                permission: user.permissions
            }

            const signature = process.env.JOSE_JWT_SECRET

            const signatureEncoded = new TextEncoder().encode(signature)

            //token

            const token = await new jose.SignJWT(userInformation).setProtectedHeader({ alg: "HS256" }).setExpirationTime("48h").sign(signatureEncoded)

            const response = NextResponse.json({ message: "Logged in successfully" },{status : 200})

            response.cookies.set(
                {
                    name : "auth-token",
                    value : token,
                    httpOnly : true,
                    secure : false,
                    sameSite : "lax",
                    maxAge : 60 * 60 * 24 * 2 //two days
                }
            )

            return response


        } else {
            return NextResponse.json({ message: "Invalid Password" }, { status: 401 })
        }



    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }

}