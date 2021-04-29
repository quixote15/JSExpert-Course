\n\n// Symbol é um tipo primitivo que foi adicionado em 2015 na linguagem
// Comum usar pra valores unicos (chaves de objetos ou nomes de funcao)
// Usar para criar funcoes privadas em classes que nao devem ser acessadas diretamente
// Podemos utilizar as propriedades de Symbol para interceptar o comportamento padrao de objetos

const assert = require('assert')

// --- keys
const uniqueKey = Symbol("userName")
const user = {}

user["userName"] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

// console.log('getting normal Objects', user.userName)
// // sempre Ãºnico em nivel de endereco de memoria
// console.log('getting normal Objects', user[Symbol("userName")])
// console.log('getting normal Objects', user[uniqueKey])

assert.deepStrictEqual(user.userName, 'value for normal Objects')

// // sempre Ãºnico em nivel de endereco de memoria
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')

// Ã© dificil de pegar, mas nao Ã© secreto!
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - mÃ¡ prÃ¡tica (nem tem no codebase do node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)
// --- keys

// Well Known Symbols
const obj = {
    // iterators 
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                // remove o ultimo e retorna
                value: this.items.pop()
            }
        }
    })
}

// for( const item of obj) {
//     console.log('item', item)
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }
    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== "string") throw new TypeError()

        const itens = this[kItems]
                        .map(item => 
                                new Intl
                                    .DateTimeFormat("pt-BR", { month: "long", day: "2-digit", year: "numeric"})
                                    .format(item)
                            )
        
        return new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction"}).format(itens)

        
    }
    *[Symbol.iterator]() {
      console.log('Normal iterator@')
        for (const item of this[kItems]) {
            yield item
        }
    }

    async *[Symbol.asyncIterator]() {
      console.log('Async iterator@')
        const timeout = ms => new Promise(r => setTimeout(r, ms))
        for( const item of this[kItems]) {
            await timeout(100)
            yield item.toISOString()
        }
    }
    get [Symbol.toStringTag]() {
        return 'WHAT?'
    }
}

const myDate = new MyDate(
    [2020, 03, 01],
    [2018, 02, 02]
)

const expectedDates = [
    new Date(2020, 03, 01),
    new Date(2018, 02, 02),
]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]')
assert.throws(() => myDate + 1, TypeError)

// coercao explicita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

// implementar o iterator!
assert.deepStrictEqual([...myDate], expectedDates)

// ;(async() => {
//     for await(const item of myDate) {
//         console.log('asyncIterator', item)
//     }
// })()

;(async () => {
    const dates = [];
    for await(const date of myDate) {
      dates.push(date)
    }
   const expectedDatesInISOString = expectedDates.map(item => item.toISOString())

    const dates2 = await Promise.all([...myDate])
   console.log('dates: ', dates)
   console.log('dates2: ', dates2)
assert.deepStrictEqual(dates, expectedDatesInISOString)
})()