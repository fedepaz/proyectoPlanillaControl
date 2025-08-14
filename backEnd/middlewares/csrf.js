import csurf from "csurf";

export const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
  skip: (req) => {
    return (
      req.url.startsWith("/csrf-token") ||
      req.url.startsWith("/session") ||
      req.url.startsWith("/resetPassword")
    );
  },
});
