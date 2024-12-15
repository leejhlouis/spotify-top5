import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies()
  const loggedIn = !!cookieStore.get('accessToken')?.value
  return NextResponse.json({ loggedIn })
}