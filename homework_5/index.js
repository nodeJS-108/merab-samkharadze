const httpModule = require("http");
const fs = require("fs");
const path = require("path");

const host = "localhost";
const port = 8000;
const databasePath = path.join(__dirname, "database.json");

// Utility functions
const readDatabase = () => {
  const data = fs.readFileSync(databasePath, "utf8");
  return JSON.parse(data);
};

const writeDatabase = (data) => {
  fs.writeFileSync(databasePath, JSON.stringify(data, null, 2), "utf8");
};

// CORS handling
const allowedCors = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
};

// Request handling
const requestListener = (req, res) => {
  allowedCors(req, res);

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET") {
    if (url.pathname === "/userInfo") {
      const users = readDatabase();
      res.writeHead(200);
      res.end(JSON.stringify(users));
    } else if (url.pathname.startsWith("/userInfo/")) {
      const userId = Number(url.pathname.substring("/userInfo/".length));
      if (isNaN(userId)) {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            success: false,
            message: "Error: userId must be a number!",
          })
        );
      } else {
        const users = readDatabase();
        const user = users.find((user) => user.id === userId);
        if (user) {
          res.writeHead(200);
          res.end(JSON.stringify(user));
        } else {
          res.writeHead(404);
          res.end(
            JSON.stringify({
              success: false,
              message: "User with given Id could not be found",
            })
          );
        }
      }
    } else {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          success: false,
          message: "Route not found",
        })
      );
    }
  } else if (req.method === "POST" && url.pathname === "/addUser") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const newUser = JSON.parse(body);
        const users = readDatabase();
        const ids = users.map((user) => user.id);
        const maxId = ids.length ? Math.max(...ids) : 0;
        const newId = maxId + 1;
        newUser.id = newId;
        users.push(newUser);
        writeDatabase(users);
        res.writeHead(200);
        res.end(`\nNew user has been added: ${JSON.stringify(newUser)}\n`);
      } catch (error) {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            success: false,
            message: "Invalid JSON format in request body",
          })
        );
      }
    });
  } else if (req.method === "PUT" && url.pathname.startsWith("/updateUser/")) {
    const userId = Number(url.pathname.substring("/updateUser/".length));
    if (isNaN(userId)) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          success: false,
          message: "Error: userId must be a number!",
        })
      );
    } else {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const updatedUser = JSON.parse(body);
          const users = readDatabase();
          const userIndex = users.findIndex((user) => user.id === userId);
          if (userIndex !== -1) {
            users[userIndex] = { id: userId, ...updatedUser };
            writeDatabase(users);
            res.writeHead(200);
            res.end(
              `\nUser information updated: ${JSON.stringify(
                users[userIndex]
              )}\n`
            );
          } else {
            res.writeHead(404);
            res.end(
              JSON.stringify({
                success: false,
                message: "User with given Id could not be found",
              })
            );
          }
        } catch (error) {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              success: false,
              message: "Invalid JSON format in request body",
            })
          );
        }
      });
    }
  } else if (
    req.method === "DELETE" &&
    url.pathname.startsWith("/deleteUser/")
  ) {
    const userId = Number(url.pathname.substring("/deleteUser/".length));
    if (isNaN(userId)) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          success: false,
          message: "Error: userId must be a number!",
        })
      );
    } else {
      const users = readDatabase();
      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
        writeDatabase(users);
        res.writeHead(200);
        res.end(`\nUser with id ${userId} has been deleted\n`);
      } else {
        res.writeHead(404);
        res.end(
          JSON.stringify({
            success: false,
            message: "User with given Id could not be found",
          })
        );
      }
    }
  } else {
    res.writeHead(405);
    res.end(
      JSON.stringify({
        success: false,
        message: "Only GET, POST, PUT, and DELETE requests are allowed",
      })
    );
  }
};

// Create and start the server
const server = httpModule.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
