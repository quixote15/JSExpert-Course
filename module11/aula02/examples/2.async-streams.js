import { setTimeout } from "timers/promises";
import { pipeline } from "stream/promises";
async function* mycustomReadable() {
  yield Buffer.from("this is my life");
  await setTimeout(100);
  yield Buffer.from("custom readable stream");
  for (let i = 0; i < 1e6; i++) {
    yield Buffer.from("Tiago-" + i);
  }
}

async function* mycustomWritable(stream) {
  for await (let chunk of stream) {
    console.log("my chunk: [writable] ", chunk);
  }
}

/**
 * Transform serve para fazer algum processamento de dados, validações, calculos etc.
 * @param {*} stream
 */
async function* mycustomTransform(stream) {
  for await (let chunk of stream) {
    yield chunk.toString().replace(/\s/g, "_");
  }
}

async function* mycustomDuplex(stream) {
  let bytesRead = 0;
  const wholeString = [];

  // For loop works as writeable stream
  for await (let chunk of stream) {
    console.log("[duplex writable]: ", chunk);
    bytesRead += chunk.length;
    wholeString.push(chunk);
  }

  // Those yield work as readable string
  // Because whoever esse calling myCustomDuplex
  // Can consume/read values yielded below
  yield `ẁhole string ${wholeString}`;
  yield `bytesRead ${bytesRead}`;
}
try {
  const controller = new AbortController();

  // caso precise cancelar um fluxo

  setImmediate(() => controller.abort());
  await pipeline(
    mycustomReadable,
    mycustomTransform,
    mycustomDuplex,
    mycustomWritable,
    { signal: controller.signal }
  );
} catch (error) {
  console.log("Stream error", error.message);
}

console.log("process finished");
