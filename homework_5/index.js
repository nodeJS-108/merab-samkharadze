const httpModule = require("http");

const host = "localhost";
const port = 8000;

const users = [
  { id: 1, name: "John Johnson" },
  { id: 2, name: "Lika Beridze" },
  { id: 3, name: "Luka Shengelia" },
];

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

const requestListener = (req, res) => {
  allowedCors(req, res); // Ensure CORS headers are set

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET") {
    if (url.pathname === "/userInfo") {
      res.writeHead(200);
      res.end(JSON.stringify(users));
    } else if (url.pathname.startsWith("/userInfo/")) {
      const userId = Number(url.pathname.substring(10));
      if (isNaN(userId)) {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            success: false,
            message: "Error: userId must be a number!",
          })
        );
      } else {
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
  } else if (req.method === "POST") {
    if (url.pathname === "/addUser") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const newUser = JSON.parse(body);
          const ids = users.map((user) => user.id);
          const maxId = Math.max(...ids);
          const newId = maxId + 1;
          newUser.id = newId;
          users.push(newUser);
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
    } else {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          success: false,
          message: "Route not found",
        })
      );
    }
  } else if (req.method === "PUT") {
    if (url.pathname.startsWith("/updateUser/")) {
      const userId = Number(url.pathname.substring(12)); // Extract userId from URL

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
            const userIndex = users.findIndex((user) => user.id === userId);

            if (userIndex !== -1) {
              users[userIndex] = { id: userId, ...updatedUser }; // Update user info
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
    } else {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          success: false,
          message: "Route not found",
        })
      );
    }
  } else if (req.method === "DELETE") {
    if (url.pathname.startsWith("/deleteUser/")) {
      const userId = Number(url.pathname.substring(12));

      if (isNaN(userId)) {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            success: false,
            message: "Error: userId must be a number!",
          })
        );
      } else {
        const userIndex = users.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
          users.splice(userIndex, 1); // Remove user
          res.writeHead(200);
          res.end(`\nUser with id ${userId} has been deleted\n`);
        } else {
          res.writeHead(404);
          res.end(
            JSON.stringify({
              success: false,
              message: `User with given Id could not be found`,
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
  } else {
    res.writeHead(405);
    res.end(
      JSON.stringify({
        success: false,
        message: "Method Not Allowed",
      })
    );
  }
};

const server = httpModule.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
