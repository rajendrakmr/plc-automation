 
import { NextRequest, NextResponse } from "next/server";

function isMobile(userAgent: string): boolean {
  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(
    userAgent
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();
 
  const ua = req.headers.get("user-agent") ?? "";
  if (isMobile(ua)) {
    const url = req.nextUrl.clone();
    url.pathname = "/no-access";
    return NextResponse.redirect(url);
  } 
  const cookie = req.cookies.get("admin_session");
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};