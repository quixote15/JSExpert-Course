import { createServer } from "http";
import { randomUUID } from "crypto";

import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";
const handler = async (req, res) => {
  const fileName = `file-${randomUUID()}.csv`;
  await pipeline(req, createWriteStream(fileName));

  res.end("upload success.");
};

createServer(handler).listen(3000, () => {
  console.log("listening at 3000");
});
