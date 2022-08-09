const http = require("http");
const fs = require("fs");
const url = require("url");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/, product.image);
  output = output.replace(/{%QUANTITY%}/, product.quantity);
  output = output.replace(/{%PRICE%}/, product.price);
  output = output.replace(/{%FROM%}/, product.from);
  output = output.replace(/{%NUTRIENTS%}/, product.nutrients);
  output = output.replace(/{%ID%}/, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/, "not-organic");
  }
  return output;
};

// SERVER
const server = http.createServer((req, res) => {
  const pathName = req.url;

  //Overview Page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product Page
  } else if (pathName === "/product") {
    res.end("this is product");

    //API
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    //Not found
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
