import csurf from "csurf";

export const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
  skip: (req) => {
    // Skip CSRF for session routes (login, password reset)
    return (
      req.path.startsWith("/session") || req.path.startsWith("/resetPassword")
    );
  },
});
