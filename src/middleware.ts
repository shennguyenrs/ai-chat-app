import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { getToken } from "next-auth/jwt";

const NUMBER_OF_REQUESTS = 10;
const DURATION = "1 s";

export default async function middleware(req: NextRequest) {
  // Only turn on rate limtiting on production
  if (process.env.NODE_ENV !== "development") {
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
    const rateLimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(NUMBER_OF_REQUESTS, DURATION),
      analytics: true,
    });

    const { success, limit, reset, remaining } = await rateLimit.limit(ip);

    if (!success) {
      return new Response("You meet calling API limit", {
        status: 429,
        headers: {
          "X-Ratelimit-Limit": limit.toString(),
          "X-Ratelimit-Remaining": remaining.toString(),
          "X-Ratelimit-Reset": reset.toString(),
        },
      });
    }
  }

  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const path = req.nextUrl.pathname;

  // Prevent unauthenticaed user can use service
  if (!isAuthenticated && path === "/") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Prevent authenticated user can navigate to login page
  if (isAuthenticated && path === "/auth/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/api/chat/:path*", "/auth/login"],
};
