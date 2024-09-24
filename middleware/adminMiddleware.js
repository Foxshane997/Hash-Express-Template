function checkAdmin(req, res, next) {
  if (req.session && req.session.is_admin) {
    return next();
  } else {
    return res.status(403).send("Access denied: Admins only.");
  }
}

module.exports = checkAdmin;
