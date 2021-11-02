import {Readable, Writable} from 'stream'

// fonte de dados
const readable = Readable({
    read() {
        this.push('hello world 1')   
        this.push('hello world 2')   
        this.push('hello world 3')  
        
        //informa que dados acabaram
        this.push(null)

    }
})


const writable = Writable({
    write(chunk, encoding, cb) {
        console.log('msg', chunk.toString())
        cb()
    }
})


readable
// writable é sempre a saida -> imprimir, salvar, ignorar
.pipe(writable)

//readable
// stdout tbm é um writeble stream
//.pipe(process.stdout)