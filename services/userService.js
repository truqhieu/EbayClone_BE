const User = require("../models/user");

async function getAllUsers() {
  try {
    return await User.find();
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllUsers,
};
