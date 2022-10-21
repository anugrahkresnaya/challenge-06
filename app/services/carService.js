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

  async delete(id, payload) {
    try {
      let carId = await carRepository.getByPk(id);

      if (carId === null) {
        throw new Error('car not found');
      } else {
        await carRepository.update(payload, id)

        return (car = await carRepository.delete(id))
      }
    } catch (err) {
      throw err;
    }
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
