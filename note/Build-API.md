# Build API

```php
// data basically is get from file system
const fs = require("fs");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

// SERVER
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("this is overview");
  } else if (pathName === "/product") {
    res.end("this is product");

    // check if has path is '/api' 
  } else if (pathName === "/api") {

    // sepecity content-typo to actually what data will be send to client
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello word",
      "root-cause": "khong biest",
    });
    res.end("<h1>Page not found</h1>");
  }
});

```
- create accessToken variables in postman
-pm.environment.set("accessToken", pm.response.json().token);