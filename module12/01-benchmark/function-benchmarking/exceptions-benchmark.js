import Benchmark from 'benchmark';

import CartThrowingExceptions from './cart-throwing-exception.js'
import CartNotificationPattern from './cart-notification-pattern.js'

const suite = new Benchmark.Suite


suite
    .add('Cart#calcPriceMapReduce', function () {
        new CartThrowingExceptions('algu', 'oi')
    })
    .add('Cart#calcPriceFor', function () {
        new CartNotificationPattern('algu', 'oi')
    })
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function () {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`)
    })
    .run({ async: true })