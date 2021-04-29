\n\nconst Base = require('./base/base')
class Car extends Base{
  constructor({id, name, releaseYear, available, gasAvailable}) {
    console.log('novo car id: ', id);
    super({id, name});
    this.releaseYear = releaseYear
    this.available = available
    this.gasAvailable = gasAvailable 
  }

}

module.exports = Car;