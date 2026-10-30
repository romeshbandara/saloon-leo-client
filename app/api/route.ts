import { NextResponse } from "next/server"

export function GET() {
    console.log("Get request recived")
}
export async function POST(req) {
    const body = await req.json()
    console.log(body)
    console.log("Post request recived")
    return NextResponse.json({ message: `Hello ${body.designation}${body.student}. Welcome to the Sri Lankan No.1 ${body.subject} class. So we hope you study well! Congradulations to your future` })
}