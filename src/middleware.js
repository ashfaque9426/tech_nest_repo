import { NextResponse } from 'next/server';

export function middleware(request) {
    if(request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: [
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
}