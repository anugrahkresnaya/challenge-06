const { Cars } = require('../models');

module.exports = {
  findAll() {
    return Cars.findAll();
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

  getById(id) {
    return Cars.findOne(id);
  },
};

