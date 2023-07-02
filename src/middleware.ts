export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/profile/:path*", "/server-profile/:path*", "/create-company/:path*", "/companies/:path*"],
};
