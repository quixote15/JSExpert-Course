const {describe, it, before, beforeEach, afterEach} = require('mocha');
const CarService = require('./../../src/service/carService');

const {join} = require('path');
const {expect} = require('chai')
const sinon = require('sinon');
const { sandbox } = require('sinon')
// database Reference
// Could this be (mongo, firebase, etc) ?
const carsDatabase = join(__dirname, './../../database', 'cars.json');

const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json')
}

/**
## Use Case 01

As a system user

In order to get an available car in a specific category

Given a car category containing 3 different cars

When I check if there's a car available

Then it should choose randomly a car from the category chosen
 */

describe('CarService Suite Tests', () => {
  let carService = {};
  let sandbox = {};

  // This will initialize our service with database car dependency
  before(() => {
    carService = new CarService({
      cars: carsDatabase
    })
  })

  beforeEach(() => {
    // creates a new sandbox with spies, stubs and mocks
    // To this to make sure after each test 
    // you do not have cache or dirty objects
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox = sinon.restore();
  })

  it('should choose the first id from carIds in carCategory', () => {
    
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    // Because of the random nature of the method
    // We need to use stub to always return our expected car

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(carIdIndex);

    // choose
    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)
  })

  // This case happens because choseRandomCar uses it
  it('should retrive a random position from array', () =>{
    const data = [0,1,2,3,4];
    const result = carService.getRandomPositionFromArray(data);
    expect(result).to.be.lte(data.length).gte(0);
  })

  it('given a carCategory it should return an available car', async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];   

    sandbox.stub(
            carService.carRepository,
            carService.carRepository.find.name,
        ).resolves(car)

    sandbox.spy(
            carService,
            carService.chooseRandomCar.name,
        )
    const result = await carService.getAvailableCar(carCategory);
    const expected = car;
    expect(carService.chooseRandomCar.calledOnce).to.be.ok
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
    expect(result).to.be.deep.equal(expected);
  })


})