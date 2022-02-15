// Objetivo dos generators é fazer com que funcoes virem listas ?
// Por que? Pra que ?
// yield é equivalente a for await


/*
Lessons Learned:
- Generators sao funcoes que podem retornar multiplos valores
- Uma ferramenta poderosa é um usar generators com async await 
- Dessa forma pode-se obter resultado de várias operacoes asincronas
- Também é possivel delegar a execuçaao de um generator com outro generator usando yield* outroGenerator()
Dá para obter todos os dados de um generators usando iterators
 1. next
 2. Array.from
 3. spread operators
*/
const assert = require('assert');


function* calcutation (arg1, agr2) {
  yield arg1 * agr2;
}

function* main() {
  yield 'Hello';
  yield '-';
  yield 'World';
  yield* calcutation(20,10);
}

const generator = main()

 
assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: '-', done: false })
assert.deepStrictEqual(generator.next(), { value: 'World', done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })
assert.deepStrictEqual(Array.from(main()),['Hello', '-', 'World', 200]) // Returns values of a generator as an arrays
assert.deepStrictEqual([...main()],['Hello', '-', 'World', 200]) // Returns values of a generator as an arrays


/// ------- async iterators

const {readFile,stat, readdir} = require('fs/promises');

function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve('Hey dude')
}




// ;(async () => {
//   await Promise.all([...promisified()]).then(result => {
//     console.log('result: ', result)
//   })

// })()

// ;(async() => {
//   for await(const item of promisified()) {
//     console.log('for await:', item)
//   }
// })()

// ---- Juntando genetaror com async await
// Também chamado de async operator

async function* systemInfo(){
  const file = await readFile(__filename);
  yield {file: file.toString()};
  const {size} = await stat(__filename)
  yield {size}

  const dir = await readdir(__dirname)
  yield {dir}
}

// ;(async() => {
//   for await(const item of systemInfo()) {
//     console.log('for await:', item)
//   }
// })()

async function* fileInfo() {
  const file = await readFile(__filename);
  yield {file: file.toString()};
  const {size} = await stat(__filename)
  yield {size}
}

async function* systemInfo2(){
  yield* fileInfo()
  const dir = await readdir(__dirname)
  yield {dir}
}


;(async() => {
  for await(const item of systemInfo2()) {
    console.log('for await:', item)
  }
})()