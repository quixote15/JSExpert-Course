import http from "http";

const handler = async (req, res) => {};

const handlerTwo = async (req, res) => {};

http
  .createServer(handler)
  .listen(3000, () => console.log("listening at port 3000"));

http
  .createServer(handlerTwo)
  .listen(4000, () => console.log("listening at port 4000"));
