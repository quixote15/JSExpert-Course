import { createServer } from "http";
import { parse, fileURLToPath } from "url";
import { Worker } from "worker_threads";

import { dirname } from "path";
import sharp from "sharp";

const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerfileName = "worker.js";
// agendar processo para ser executado em segundo plano
async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentFolder}/${workerfileName}`);

    worker.postMessage(images);
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0) {
        return reject(
          new Error(`Thread ${worker.threadId} exited with exit code ${code}`)
        );
      }
      console.log(`the Thread ${worker.threadId} exited`);
    });
  });
}

const handler = async (req, res) => {
  if (req.url.includes("joinImages")) {
    const {
      query: { img, background },
    } = parse(req.url, true);
    console.log({ img, background });
    const imageBase64 = await joinImages({
      image: img,
      background,
    });

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(
      `<img style="width: 100%; height: 100%;" src="data:image/jpeg;base64,${imageBase64}">`
    );
    return;
  }

  return res.end("ok");
};
createServer(handler).listen(3000, () => console.log("runnning at 3000"));

// https://static3.tcdn.com.br/img/img_prod/460977/boneco_tracker_predator_predador_predadores_predators_escala_1_6_mms147_hot_toys_cg_43510_1_20190427140400.png

// https://static3.tcdn.com.br/img/img_prod/460977/action_figure_predador_predator_big_red_alien_vs_predator_neca_60385_1_20201211173157.png

//https://wallpaperaccess.com/full/3057585.jpg

// https://i.ytimg.com/vi/LTqV4Bfhelc/maxresdefault.jpg

// Inteiro
// http://localhost:3000/joinImages?img=https://static3.tcdn.com.br/img/img_prod/460977/boneco_tracker_predator_predador_predadores_predators_escala_1_6_mms147_hot_toys_cg_43510_1_20190427140400.png&background=https://i.ytimg.com/vi/LTqV4Bfhelc/maxresdefault.jpg
