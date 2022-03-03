NodeJS streams permitem que grandes quantidates de dados como arquivos grandes de texto, audio, videos processamento de imagens e outros sejam processados pedaço por pedaço.

Esses pedaços de dados que chegam ao longo do tempo em uma stream são chamados de chunks.

Para manipular streams Podemos utilizar:

1. `import stream`: core api presente no node js
2. async generators: que são uma funcionalidade do javascript

OBS: Por baixo dos panos streams são implementadas utilizando async generators;

### Well-known Streams

- Request, response em uma webapi são streams
- stdin e stdout são streams IO do terminal em que o procesos node executa

### Pipelines

Toda stream de dados pode repassar seus dados ou pedaços de dados (chunks) para outras streams ou funções por meio de pipes ou pipelines. Podemos entender um pipeline como o canal de transporte que leva um chunk de um ponto A até um ponto B. Nesse caso de uma stream A até uma Stream B ou uma função B.

### Callbacks

Geralmente as NodeJS streams utilizam funções callbacks e é geralmente um dos lugares onde em tese pode-se usar esse padrão para resolver coisas asyncronas. Entretanto, existe a possibilidade de executar streams usando async-await.

### Duplex Streams vs Transform

Uso:
`import { Duplex, Transform } from "stream";`

Tanto a classe Duplex quanto Transform são duplex streams. Ou seja, são Writeable e Readable streams.

- Duplex: Possui os métodos `read` e `write` que agem de forma independente como se fossem instancias de streams diferentes
- Transform: Age principalmente como uma Writeable stream porém é possível utilizar o método `push` presente nas Readable streams. Ao utilizar o `push` em um Transform o dado passado é simplementes repassado para frente.

### Referencias

https://www.slideshare.net/OdessaJSConf/andrii-shumada-use-cases-of-nodejs-streams
https://erickwendel.com/talk/detail/5ee6b2452c16eb4db7e7b776
https://github.com/maxogden/mississippi#duplex

https://giphy.com
https://www.electronjs.org/docs/api/desktop-capturer
https://nodejs.org/es/docs/guides/backpressuring-in-streams/#lifecycle-of-pipe
https://github.com/ErickWendel/nodejs-certification/blob/master/draft/index9.js
https://devhints.io/nodejs-stream
https://github.com/substack/stream-handbook

https://s3.amazonaws.com/four.livejournal/20091117/jsconf.pdf
https://nodejs.org/docs/
https://nodejs.org/docs/v0.1.100/api.html
https://medium.com/autodesk-tlv/streams-in-depth-in-node-js-c8cc7f1eb0d6
http://codewinds.com/blog/2013-08-31-nodejs-duplex-streams.html#what_is_a_duplex_stream_
https://stackoverflow.com/questions/18335499/nodejs-whats-the-difference-between-a-duplex-stream-and-a-transform-stream
https://nodejs.org/api/stream.html
