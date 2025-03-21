export const debugMiddleware = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  res.on("finish", () => {
    console.log(
      `${new Date().toISOString()} - Completed ${res.statusCode} ${
        req.method
      } ${req.url}`
    );
  });
  next();
};
