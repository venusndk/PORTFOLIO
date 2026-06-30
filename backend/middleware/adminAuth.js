export const adminAuth = (req, res, next) => {
  const provided = req.headers["x-admin-password"];
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return res.status(503).json({ error: "Admin password not configured on server" });
  }

  if (!provided || provided !== expected) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
