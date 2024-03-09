import { NextResponse } from 'next/server';
import store from './lib/redux/store/store';

export function middleware(request) {
    const accessPermissionState = store.getState().accessPermission;
    const isGranted = accessPermissionState.accessPermission;


    if(!isGranted && request.nextUrl.pathname === "/login") {
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