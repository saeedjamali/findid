import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose';

import { redirect } from 'next/dist/server/api-utils';
import { verifyRefreshToken } from '@/utils/auth';
const { pathToRegexp } = require("path-to-regexp");

export async function middleware(request) {
    // return NextResponse.next();

  
    let refreshToken = request.cookies.get('refresh-token')?.value;
    const refreshTokenPayload = await verifyRefreshToken(refreshToken);
  
    if (!refreshTokenPayload) {
  
       return NextResponse.next();
        
    }
  
    return NextResponse.next();
}

// export const config = {
//     matcher: ['/p-modir/:path*',  '/((?!api|api/auth|api/unit|api/user|_next/static|_next/image|auth|favicon.ico|robots.txt|images|fonts|$).*)']
// }

// // '/api/:path*',
// , '/((?!api/auth|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)'

// if (request.nextUrl.pathname.startsWith('/')) {
//     return NextResponse.rewrite(new URL('/p-modir', request.url))
// }



// const paths = [

//     "/p-modir",
//     "/favicon.ico",
//     "/_next/something",
//     "/a",
//   ];
  
//   const matcher = pathToRegexp("/((?!about|contact|sales).{1,})");
  
//   paths.forEach((path) => {
//     console.log({ path, test: matcher.test(path) });
//   });

// if (request.nextUrl.pathname.startsWith('/p-lecturer/verify')) {
//     // console.log("Hiiiii")    
//     return NextResponse.redirect(new URL('https://amar.razaviedu.ir/account/login', request.url))
    
// }