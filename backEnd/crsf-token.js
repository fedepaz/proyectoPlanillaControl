import express from "express";

const csrfTokenRouter = express.Router();

csrfTokenRouter.get("/", (req, res) => {
  try {
    const csrfToken = req.csrfToken();
    res.json({ csrfToken: csrfToken });
  } catch (err) {
    console.error("CSRF Token Error:", err);
    res.status(500).json({ message: "Could not generate CSRF token" });
  }
});

export default csrfTokenRouter;
