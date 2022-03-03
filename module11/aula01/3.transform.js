import { Readable, Writable, Transform } from "stream";
import { createWriteStream } from "fs";
// fonte de dados
const readable = Readable({
  read() {
    for (let index = 0; index < 1e6; index++) {
      const person = {
        id: Date.now() + index,
        name: `Tiago-${index}`,
      };
      const data = JSON.stringify(person);
      this.push(data);
    }

    //informa que dados acabaram
    this.push(null);
  },
});

// Processamento de dados{}
// converte objeto em CSV
const mapFields = Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk);
    const res = `${data.id}, ${data.name.toUpperCase()}\n`;
    cb(null, res);
  },
});

// Adiciona cabeçalho do CSV
const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk);
    }

    this.counter += 1;
    cb(null, "id, name\n".concat(chunk));
  },
});

const writable = Writable({
  write(chunk, encoding, cb) {
    console.log("msg", chunk.toString());
    cb();
  },
});

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // writable é sempre a saida -> imprimir, salvar, ignorar
  //.pipe(process.stdout)
  .pipe(createWriteStream("my.csv"));

pipeline.on("end", () => console.log("acabou"));
//readable
// stdout tbm é um writeble stream
