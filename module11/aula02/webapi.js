import { count } from "console";
import { read } from "fs";
import http from "http";
import { Readable } from "stream";

/**
 *
 * @param {Request} req É uma ReadableStream
 * @param {Response} res  É uma WritableStream
 *
 * A requisição que vem do cliente http por baixo dos panos é uma readable stream
 * O que significa o request é nossa fonte de dados ou uma stream de dados
 *
 * Já o response é uma writeable stream
 * Isso significa que podemos ler os dados de qualque ReadableStream
 * E então repassar para o response por meio de um pipe
 *
 * Exemplo:
 * request.pipe(response)
 * Pegue tudo que chegar no request stream e repasse para a response stream
 */
const handler = async (req, res) => {
  res.write("Estou escrevendo coisas na stream response\n");
  res.write("Tudo que eu escrevo nessa writeable stream vai aparecer\n");
  res.write("tudo mesmo\n");
  res.write("cada chamada dessa ao metodo write vai ser escrita na stream\n");
  res.write("são os chunks de nossa stream aqui");
  res.write("esses chunks eu to escrevendo manualmente");
  res.write(
    "no caso da stream de request isso tá sendo feito automáticamente pelo pipe"
  );
  res.write("no final irão aparecer todos os dados escritos na stream\n");
  req.pipe(res);
};

const handlerStream = async (req, res) => {
  let count = 0;
  const maxItems = 99;
  const getRandomNamesStream = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({ id: Date.now() + count, name: `Tiago-${count}` }) +
              "\n"
          );
          return;
        }
        clearInterval(intervalContext);
        this.push(null);
      };
      setInterval(function () {
        everySecond(this);
      });
    },
  });

  getRandomNamesStream.pipe(res);
};
const handlerTwo = async (req, res) => {
  let count = 0;
  const maxItems = 99;
  const getRandomNamesStream = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({
              id: Date.now() + count,
              name: `Zezinho-${count}`,
            }) + "\n"
          );
          return;
        }
        clearInterval(intervalContext);
        this.push(null);
      };
      setInterval(function () {
        everySecond(this);
      });
    },
  });

  getRandomNamesStream.pipe(res);
};

http
  .createServer(handler)
  .listen(3001, () => console.log("listening at port 3001"));

http
  .createServer(handlerStream)
  .listen(3000, () => console.log("listening at port 3000"));
http
  .createServer(handlerTwo)
  .listen(4000, () => console.log("listening at port 4000"));
