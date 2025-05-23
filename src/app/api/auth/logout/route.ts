  import { cookies } from "next/headers";
  import { NextResponse } from "next/server";

  export async function GET(): Promise<NextResponse> {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken') 
    cookieStore.delete('displayName') 

  return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!)
  }