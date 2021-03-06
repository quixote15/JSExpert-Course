\n\n"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('../Person.js',{default(v){Person=v}},2);



const {describe, it} = mocha
const {expect} = chai;

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString('4 Moto,carro 300000 2020-01-01 2020-01-03');
    const expected = {
      id: '4',
      vehicles: ['Moto', 'carro'],
      kmTraveled: '300000',
      from: '2020-01-01',
      to: '2020-01-03'
    }

    expect(person).to.be.deep.equal(expected)
  });

  it('should return formated values ', () => {
    const DEFAULT_LANG = "pt-BR"
    const person = Person.generateInstanceFromString('4 Moto,carro 300000 2020-01-01 2020-01-03');
    const result = person.formatted(DEFAULT_LANG);
    const expected = {
      id: 4,
      vehicles: 'Moto e carro',
      kmTraveled: '300.000 km',
      from: '01 de janeiro de 2020',
      to: '03 de janeiro de 2020'
    }

    expect(result).to.be.deep.equal(expected);
  })
})