const http = require("http");
const app = require("./app");
const { PORT } = require("./utils/config");

const server = http.createServer(app);

server.listen(3001, () => {
  console.log(`Server running on port ${PORT}`);
});
