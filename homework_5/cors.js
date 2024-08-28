const httpModule = require("http");

const host = "localhost";
const port = 8000;

const allowedCors = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
};

const requestListener = (req, res) => {
  res.writeHead(200);
  res.end("Hello World");
};

const server = httpModule.createServer();

server.on("request", allowedCors);

server.on("request", requestListener);

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
