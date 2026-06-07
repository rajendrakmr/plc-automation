import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const isProtected = req.nextUrl.pathname.startsWith("/admin");
    const cookie = req.cookies.get("admin_session");

    if (isProtected && !cookie) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};