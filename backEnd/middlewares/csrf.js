import csurf from "csurf";

export const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  },
  skip: (req) => {
    const shouldSkip =
      req.url.startsWith("/csrf-token") ||
      req.url.startsWith("/session") ||
      req.url.startsWith("/resetPassword");
    return shouldSkip;
  },
});
