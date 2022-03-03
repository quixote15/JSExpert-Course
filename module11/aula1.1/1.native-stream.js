/**
 * No node assim como em C/C++ utilizamos
 * stdin: para pegar input do usuário no terminal
 * stdout: para mostrar/enviar dados de saida no terminal
    
    NOTA: stdin e stdout são ponteiros? ou streams?

    1. JSNAD: https://mdbf42.medium.com/como-obter-a-certifica%C3%A7%C3%A3o-oficial-nodejs-jsnad-377984641598
    2. As NodeJS Streams Herdam a classes Events do nodeJS, e portanto podem conter eventos associados com as streams


    ls | grep package | xargs cat | jq .name
*/

// Pipeline são como funis que pegam chunk (pedaços) de dados e passam para frente
// Nesse exemplo, lemos tudo que vier no terminal e jogamos de volta pra o stdout utilizando um pipe
process.stdin
  .pipe(process.stdout)
  .on("data", (msg) => console.log(msg.toString()))

  .on("error", (msg) => console.log(msg.toString()))
  .on("end", (msg) => console.log("end"))
  .on("close", (msg) => console.log("close", msg.toString()));

// Uma stream pode se comportar como um chat!!!
// terminal 1
//  node -e "process.stdin.pipe(require('net').connect(1338))"

// terminal 2
// node -e "require('net').createServer(socket => socket.pipe(stdout)).listen(1338)"

//node -e "process.stdout.write(crypto.getRandomValues(1e9))" > big.file

import http from "http";
import { createReadStream, readFileSync } from "fs";
const handle = (req, res) => {
  // Enviar um arquivo muito grande em forma de string dá o seguinte erro
  //  {
  //      code: 'ERR_STRING_TOO_LONG'
  //  }
  //const file = readFileSync("big.file").toString();

  createReadStream("big.file").pipe(res);

  // Com readFileSync gastamos mais memória da máquina e não otimizamos o processamento da stream
  // const file = readFileSync("big.file").toString();
  // res.write(file);
  // res.end();
};
http.createServer(handle).listen(3000, () => console.log("running at 3000"));

// curl localhost:3000 -o output.txt
