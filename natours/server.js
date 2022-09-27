const dotenv = require("dotenv");

const app = require("./app");
const db = require("./config/db");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT REJECTION ! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({
  path: "./config.env",
});

// Connect to DB
db.connect().then(() => console.log("DB connect successful!"));

// 4) START SERVER
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// if have error occur, app will shutdown, can not accces or manipulate it
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLER REJECTION ! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
