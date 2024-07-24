/**
 * An array of routes that are accessible without authentication.
 * These routes do not require a user to be logged in.
 * @type { string[] }
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /home
 * @type { string[] }
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes
 * @type { string }
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after a successful login.
 * This is the path that is redirected to after a successful login.
 * @type { string }
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";
