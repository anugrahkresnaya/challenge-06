const { Cars } = require('../models');

module.exports = {
  findAll() {
    return Cars.findAll();
  },

  findByAvailableIsTrue() {
    return Cars.findAll({
      where: { dataAvailable: true }
    })
  },

  create(body) {
    return Cars.create(body);
  },

  update(body, id) {
    return Cars.update(body, {
      where: { id }
    });
  },

  delete(id) {
    return Cars.destroy({
      where: { id }
    });
  },

  softDelete(payload, id) {
    return Cars.update(payload, { where: { id } })
  },

  getByPk(id) {
    return Cars.findByPk(id);
  },

  getById(id) {
    return Cars.findOne(id);
  },
};

