import jwt from "jsonwebtoken";

const SECRET = toString(process.env.SECRET_JWT_KEY);

export const cookieVerify = (req, res, next) => {
  const token = req.cookies.access_token;

  req.session = { user: null };
  try {
    const data = jwt.verify(token, SECRET);

    req.session.user = data;
  } catch {}
  next();
};
