import { verifyJWT, signJWT } from "../utils/jwt.utils.js";

const SECRET = toString(process.env.SECRET_JWT_KEY);

function desearializeUser(req, res, next) {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken);
  if (payload) {
    req.user = payload;
    return next();
  }

  return next();
}

export default desearializeUser;
