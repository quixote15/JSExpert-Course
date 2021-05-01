const rewiremock = require('rewiremock/node');
const { deepStrictEqual} = require('assert');


const dbData = [{name: 'Mariazinha'}, {name: 'Joaozin'}];

class MockDatabase {
  connect = () => this

  find = async (qeury) => dbData
};

rewiremock(() => require('../src/util/database')).with(MockDatabase);

;(async function() {
  {
    const expected = [{ name: 'MARIAZINHA'}, { name: 'JOAOZIN'}];
    rewiremock.enable()
    const UserFactory = require('../src/factory/userFactory');

    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();

    deepStrictEqual(result, expected);
    rewiremock.disable()
  }

  {
        const expected = [{ name: 'TIAGO CONCEICAO'}]
        const UserFactory = require('../src/factory/userFactory')

        const userFactory = await UserFactory.createInstance()
        const result = await userFactory.find()
        deepStrictEqual(result, expected)
        
    }
})()