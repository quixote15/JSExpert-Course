import { Duplex, Transform } from "stream";
let count = 0;
const server = new Duplex({
  objectMode: true, //faz não precisar trabalhar com buffer => gasta mais memoria
  encoding: "utf-8",
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`[EVERYSECOND]: My name is Tiago ${count}`);
        return;
      }
      clearInterval(intervalContext);
      this.push(null);
    };
    setInterval(function () {
      everySecond(this);
    });
  },

  write(chunk, encoding, cb) {
    console.log(`[WRITEBLE OF DUPLEX] saving`, chunk);
    cb();
  },
});

const transformToUpperCase = Transform({
  objectMode: true,
  transform(chunk, enc, cb) {
    cb(null, chunk.toUpperCase());
  },
});

// provar que são canais de comunicação diferentes
// .write aciona o write do Duplex
server.write("[dupleX] hey this is a writeable!");

//server.on('data', (msg) => console.log(`[readable] ${msg}`))

server.push(`[duplex] hey this is also readable`);

transformToUpperCase.write("[transform] hey this is a writeable!");
transformToUpperCase.push("[transform] hey this is a readable!");

//redireciona todos os dados de readable para writeable da duplex
server
  // transform ´e tambem um duplex, mas não possuem comunicação independente
  .pipe(transformToUpperCase)
  .pipe(server);
