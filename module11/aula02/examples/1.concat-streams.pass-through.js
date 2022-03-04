import { Writable } from "stream";
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

const result = requests.map(({ data }) => data);

const output = Writable({
  write(chunk, enc, callback) {
    const data = chunk.toString();
    console.log("data", data);
    callback();
  },
});
result[0].pipe(output);
result[1].pipe(output);
