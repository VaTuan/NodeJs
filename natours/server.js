const dotenv = require("dotenv");

const app = require("./app");
const db = require("./config/db");

dotenv.config({
  path: "./config.env",
});

// Connect to DB
db.connect();

// 4) START SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
