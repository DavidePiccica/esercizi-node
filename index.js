import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("request accepted");

  response.statusCode = 200;

  response.setHeader("Content-Type", "text/html");

  response.end(
    "<html><body><h1>Hello world!</h1></body></html>"
  );
});

server.listen(3000, () => {
  console.log(`Server listening`);
});