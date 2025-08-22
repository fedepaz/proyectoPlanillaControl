import csurf from "csurf";

export const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
  value: (req) => {
    const token = req.headers["x-csrf-token"] || req.headers["x-xsrf-token"];
    return token;
  },
});
