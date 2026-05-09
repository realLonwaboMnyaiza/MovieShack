const mongoose = require('mongoose');

module.exports = async function initializeDatabaseConnection(db) {
  await mongoose.connect(db);
};
