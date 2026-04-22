module.exports = function (req, res, next) {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .send(
        "Elavated privilege needed to access this resource. Access Denied!",
      );
  next();
};
