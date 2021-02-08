const BaseRepository = require('../entities/repository/base/baseRepository');

class CarService {
  constructor({cars}) {
    this.carRepository = new BaseRepository({file: cars});
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(
      Math.random() * listLength
    )
  }

  chooseRandomCar(carCategory){
    const position = this.getRandomPositionFromArray(carCategory.carIds);
    const car = carCategory.carIds[position];
    return car;
  }

  getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = this.carRepository.find(carId);
    return car;
  }
}

module.exports = CarService;