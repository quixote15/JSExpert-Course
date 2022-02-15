// import Benchmark from 'benchmark';
// //import CartIdOld from './cart-id-old.js'
// //import CardIdNew from './cart-id-new.js'
// // import CartRmPropOld from './cart-rm-prop-old.js'
// // import CartRmPropNew from './cart-rm-prop-new.js'
// import CartPriceOld from './cart-price-old.js'
// import CartPriceNew from './cart-price-new.js'

// import database from '../database.js'
// const suite = new Benchmark.Suite

// //  suite
// //  .add("Cart#CartIdUUID", function(){
// //      new CartIdOld()
// //  })
// //  .add("Cart#CartIdCrypto", function(){
// //      new CardIdNew()
// //  })
// //  .on('cycle', (event) => console.log(String(event.target)))
// //  .on('complete', function(){
// //      console.log(`Fastest is ${this.filter('fastest').map('name')}`)
// //  })
// //  .run()

// const data = {
//     products: [
//         {
//             id: 'ae',
//             n: undefined,
//             abc: undefined,
//             a: null,
//             b: 123
//         },
//         {
//             id: 'ae',
//             n: undefined,
//             abc: undefined,
//             a: null,
//             b: 123
//         }
//     ]
// }
// // suite
// // .add("Cart#cartRmPropOld", function(){
// //     new CartRmPropOld(data)
// // })
// // .add("Cart#cartRmPropNew", function(){
// //     new CartRmPropNew(data)
// // })
// // .on('cycle', (event) => console.log(String(event.target)))
// // .on('complete', function(){
// //     console.log(`Fastest is ${this.filter('fastest').map('name')}`)
// // })
// // .run({async: true})


// suite
//     .add('Cart#calcPriceMapReduce', function () {
//         new CartPriceOld(database)
//     })
//     .add('Cart#calcPriceFor', function () {
//         new CartPriceNew(database)
//     })
//     .on('cycle', (event) => console.log(String(event.target)))
//     .on('complete', function () {
//         console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//     })
//     .run({ async: true })


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


  console.log('before sleep');

  await sleep(1000);
  console.log('after sleep');