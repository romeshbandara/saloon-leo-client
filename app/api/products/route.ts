import { NextRequest, NextResponse } from "next/server"

export async function GET(req : NextRequest) {
    const name = req.nextUrl.searchParams.get("name")
    const age = req.nextUrl.searchParams.get("age")
    console.log("Products GET request recived")
    return NextResponse.json({message:`name = ${name} age = ${age}`})
}

export async function POST(req : NextRequest) {
    const body = await req.json()
    const message = `${body.product} is saved`
    console.log("Products GET request recived")
    return NextResponse.json({message:message})
} 