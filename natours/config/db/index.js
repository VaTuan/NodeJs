// config connect to mongoose
const mongoose = require("mongoose");

async function connect() {
  // try for error outside express
  // await mongoose.connect("asdasd");

  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
}

module.exports = { connect };
