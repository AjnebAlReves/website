import { defineMiddleware } from "astro:middleware";

const protectedRoutes = ["/dashboard"]; // Add any other protected routes here

export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;

    if (protectedRoutes.includes(pathname)) {
        const isLoggedIn = context.cookies.get("user-token")?.value;
        if (!isLoggedIn) {
            return context.redirect("/login");
        }
    }

    return next();
});