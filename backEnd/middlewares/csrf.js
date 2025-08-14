import csurf from "csurf";

export const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  },
  skip: (req) => {
    console.log("=== CSRF SKIP DEBUG ===");
    console.log("req.url:", req.url);
    console.log("req.path:", req.path);
    console.log("req.originalUrl:", req.originalUrl);
    console.log("req.method:", req.method);

    const shouldSkip =
      req.url.startsWith("/csrf-token") ||
      req.url.startsWith("/session") ||
      req.url.startsWith("/resetPassword");

    console.log("Should skip CSRF:", shouldSkip);
    console.log("======================");

    return shouldSkip;
  },
});
