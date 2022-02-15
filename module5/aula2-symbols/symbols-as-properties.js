const assert = require('assert')

const uniqueKey = Symbol('userName')
const user = {}

user['userName'] = 'Tiago santos'
user[uniqueKey] = 'Hulk, quixote15 (Private unique Symbol)'


console.log('Normal object acessing properties: ', user.userName)
console.log('Accesing with different Symbol reference: ', user[Symbol('userName')])
console.log('Accessing with unique Symbol reference: ', user[uniqueKey])


/**
 * 
 *  O valor do Symbol em um objeto é dificil de pegar, mas nao Ã© secreto!
    Ao usar o nodejs debugger
    podemos ver que o objeto user tem as seguinte propriedades:
    Symbol(userName):'Hulk, quixote15 (Private unique Symbol)'
    userName: 'Tiago santos'

    Podemos então acessar utilizando index -> Object.getOwnPropertySymbols(user)[0]
 */

 console.log('Accessing Symbol by property indexing: ', Object.getOwnPropertySymbols(user)[0])   

 // workaround: Now I have the reference do the unique sumbol
 const uniqueKeyRef = Object.getOwnPropertySymbols(user)[0]

 console.log('uniqueKeyRef: ', user[uniqueKeyRef])
 console.log('uniqueKeyRef === uniqueKey: ', uniqueKeyRef === uniqueKey)



 // Bypassing unique symbol -> Má prática

 user[Symbol.for('password')] = 'oioi'
 console.log('Symbol.for(password) === oioi: ', user[Symbol.for('password')] === 'oioi')

