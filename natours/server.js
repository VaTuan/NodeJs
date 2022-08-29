const app = require("./app");
//4) START SERVER
const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
