  import { cookies } from "next/headers";
  import { NextRequest, NextResponse } from "next/server";

  export async function GET(request: NextRequest): Promise<NextResponse> {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken') 

    return NextResponse.redirect(new URL('/', request.url))
  }