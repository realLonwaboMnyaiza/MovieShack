module.exports = function (tokenKey) {
  if (!tokenKey) {
    throw new Error("Crucial environment variables are not defined.");
  }
};
