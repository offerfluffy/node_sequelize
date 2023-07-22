module.exports.createUser = (req, res) => {};

module.exports.getUser = (req, res) => {};

module.exports.getUsers = (req, res) => {};

module.exports.updateUser = (req, res) => {};

module.exports.deleteUser = (req, res) => {
  const {
    params: { userId },
  } = req;

  res.send(`user ${userId} was deleted`);
};
