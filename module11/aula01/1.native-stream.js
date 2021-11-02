// Certificação Node com nodestreams, Vai cair
// 1. Entrada/Saida no terminal (stdin, stdout)
// process.stdin, process.stdout

// process.stdin.pipe(process.stdout)
// .on('data', (msg) => console.log('data', msg.toString()))
// .on('error', (msg) => console.log('error', msg.toString()))
// .on('end', (_) => console.log('data'))
// .on('close', (_) => console.log('data'))


//terminal 1 - client
// node -e "process.stdin.pipe(require('net').connect(1338))"

// terminal 2 - server
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

//process.stdout.write(crypto.randomBytes(1e9)) > big.file
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from 'http'
import {createReadStream,readFileSync} from 'fs'


http.createServer((req, res) => {
    // má pratica
    // const file = readFileSync('big.file').toString()
    // res.write(file)
    // res.end()

    createReadStream('big.file')
    .pipe(res)

}).listen(3000, () => console.log('listening at 3000'))