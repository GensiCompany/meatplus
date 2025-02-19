import { NextResponse } from "next/server";
// export { default } from "next-auth/middleware";
export default function middleware(request) {
    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);

    if(request.nextUrl.pathname?.startsWith("/cms")){
        const token = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");

        if (!token) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next({ headers });
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|icon.ico).*)"
    ],
};
