module.exports = function (req, res, next) {
  if (req.user.userType !== "teacher")
    return res.status(403).send("Not Authorized!");
  next();
};
