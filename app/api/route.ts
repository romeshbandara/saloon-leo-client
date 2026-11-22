
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {


    return NextResponse.json({ message: "Student created successfully!" })
}


export async function GET(req: NextRequest) {

    return NextResponse.json({ message: "GET Recived" })
}