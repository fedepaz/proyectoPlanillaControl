import csurf from "csurf";

export const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
  skip: (req) => {
    console.log("CSRF Skip Check - Path:", req.path, "URL:", req.url);
    const shouldSkip =
      req.path.startsWith("/session") || req.path.startsWith("/resetPassword");
    console.log("Should skip CSRF:", shouldSkip);
    return shouldSkip;
  },
});
