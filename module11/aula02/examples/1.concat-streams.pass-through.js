import { PassThrough, Writable, Transform } from "stream";
import axios from "axios";

const API1 = "http://localhost:3000";

const API2 = "http://localhost:4000";

const requests = await Promise.all([
  axios({
    method: "get",
    url: API1,
    responseType: "stream",
  }),

  axios({
    method: "get",
    url: API2,
    responseType: "stream",
  }),
]);

const myApiStreamResults = requests.map(({ data }) => data);

const myWritableOutputStream = Writable({
  write(chunk, enc, callback) {
    const data = chunk.toString().replace(/\n/, "");
    console.log("data", data);
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log(`[${name.toLowerCase()}] ${data}`);
    callback();
  },
});

class MyCustomPassThrough extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk, enc, cb) {
    cb(null, chunk);
  }
}

function merge(streams) {
  //A função reducer recebe quatro parâmetros:
  // Acumulador (acc)
  // Valor Atual (cur)
  // Index Atual (idx)
  // Array original (src)
  // Nesse caso o valor inicial é uma PassThrough stream
  // O current é uma stream
  // o index é o indice do loop atual
  // items é o array original de streams que foi passado
  return streams.reduce((prev, current, index, items) => {
    current.pipe(prev, { end: false });

    // como colocamos end: false, vamos manipular manualment quando nosso curret
    // terminar. Quando ele terminar, vamos verificar se todos no pipeline se encerraram
    // ele vai então forçar a cadeira do anterior (No caso do reducer o accumulador) a se fechar
    current.on("end", () => items.every((s) => s.ended) && prev.end());

    return prev;
  }, new MyCustomPassThrough() /* Ou new PassThrough()*/);
}

const streams = merge(myApiStreamResults).pipe(myWritableOutputStream);
