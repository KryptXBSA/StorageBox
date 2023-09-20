import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  // con
  let cookie = request.cookies.get("nextjs")
  const allCookies = request.cookies.getAll()

  request.cookies.has("nextjs") // => true
  request.cookies.delete("nextjs")
  request.cookies.has("nextjs") // => false

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  response.cookies.set("vercel", "fast")
  response.cookies.set({
    name: "vercel",
    value: "fast",
    path: "/",
  })
  cookie = response.cookies.get("vercel")
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

  return response
}
export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*",  "/:path*"],
}
