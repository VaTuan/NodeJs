# Routing
ban chat la cac hanh dong khac nhau cho moi URL

```php
const http = require("http");
const url = require("url");

// server
const server = http.createServer((req, res) => {
  // simple example with routing, using condition to response
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("this is overview");
  } else if (pathName === "/product") {
    res.end("this is product");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello word",
      "root-cause": "khong biest",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
```

