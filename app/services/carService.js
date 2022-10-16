const carRepository = require('../repositories/carRepository');

module.exports = {
  list() {
    const car = carRepository.findAll();

    return car;
  },

  create(reqBody) {
    return carRepository.create(reqBody);
  },

  update(reqBody, id) {
    return carRepository.update(reqBody, id);
  },

  delete(id) {
    return carRepository.delete(id);
  },

  getById(id) {
    return carRepository.getById(id)
  }
};
