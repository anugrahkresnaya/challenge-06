const carRepository = require('../repositories/carRepository');

module.exports = {
  list() {
    const car = carRepository.findAll();

    return car;
  },

  listByTrue() {
    return carRepository.findByAvailableIsTrue();
  },

  create(reqBody) {
    return carRepository.create(reqBody);
  },

  update(reqBody, id) {
    return carRepository.update(reqBody, id);
  },

  delete(payload, id) {
    return carRepository.delete(payload, id);
  },

  async softDelete(payload, id) {
    try {
      const car = await carRepository.softDelete(payload, id)

      return car;
    } catch (err) {
      throw err;
    }
  },

  getById(id) {
    return carRepository.getById(id)
  }
};
